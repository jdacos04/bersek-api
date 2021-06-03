import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {pool} from '../db'
import {IUser} from '../models/user'
import bcrypt from 'bcrypt'
import { QueryResult } from "pg";




function createToken(user:IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: 86400
    });
  }
  

  export const signUp = async (req: Request,res: Response): Promise<Response> => {
    const  {password , email} = req.body
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "por favor ingrese email y contrasena " });
    }
  
  
     const user = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
     
     const nuser = user.rows[0]
    if (nuser) {
      return res.status(400).json({ msg: "el usuario ya existe " });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt)
    const newPass = hash
  

    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, newPass]);
    return res.status(201).json('usuario creado correctamente');
  };



  export const signIn = async (req: Request,res: Response ): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "por favor ingrese email y contrasena" });
    }
  
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    const userpass= user.rows[0].password;
    console.log(userpass);

    if (!user) {
      return res.status(400).json({ msg: "El usuaio no existe" });
    }
    
    const isMatch = await bcrypt.compareSync(req.body.password, userpass)
    if (isMatch) {
        
      return res.status(400).json({ token: createToken(user.rows[0]) });
    }
  
    return res.status(400).json({
      msg: "The email or password are incorrect"
    });
  };