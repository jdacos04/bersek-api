import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import {pool} from '../db'
import { signUp } from './auth.controllers';










export const getUsers = async (req:Request,res:Response) :Promise<Response> =>{
   try{
       const response: QueryResult = await pool.query('SELECT * FROM users');
   console.log(response.rows);
    return res.status(200).json(response.rows);
}
catch(e){
    console.log(e);
    return res.status(500).json('Error en el sevidor (grifin no tuvo la culpa )')
}

}


export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const response = await pool.query('INSERT INTO users (password, email) VALUES ($1, $2)', [password, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { password, email }
        }
    })
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { password, email } = req.body;

    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        password,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

