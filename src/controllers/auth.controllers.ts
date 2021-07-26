import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {pool} from '../db'
import {IUser} from '../models/user'
import bcrypt from 'bcrypt'
import {QueryResult} from 'pg'

function createToken(user:IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: 86400
    });
  }
  

  export const signUp = async (req: Request,res: Response): Promise<Response> => {
    console.log(req.body)
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

  
    const data=req.body.email
    console.log(data)
  

    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, newPass]);
    return res.json({status: "SUCCESS",message:'Signup successful',data: data});
  };



  export const signIn = async (req: Request,res: Response ): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(500)
        .json({ msg: "por favor ingrese email y contrasena" });
    }
    
  
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    const userpass= user.rows[0].password;
    

    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    
    const isMatch = await bcrypt.compareSync(req.body.password, userpass)
    if (isMatch) {
      const data =req.body.email
        
      // return res.status(400).json({ token: createToken(user.rows[0]) ,status: "SUCCESS", message:"logeado" });
      return res.json({ status: "SUCCESS", message:"Signin successful",data:data});
    }
  
    return res.status(400).json({
      msg: "Email o password incorrectos "
    });

  };

  export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users WHERE user_id = $1', [
        id
    ]);
    res.json(`usuario eliminado `);
};

export const updateUsers= async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt)
    const newPass = hash



  const response = await pool.query('UPDATE users SET email = $1, password = $2 WHERE user_id = $3', [email,newPass,id ]);
  res.status(200).json({message:'Usuario actualizado ',
          body:{
              user:{email, password, id}
          }});

};

export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return res.status(200).json(response.rows[0].email);
};