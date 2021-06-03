import multer from 'multer'
import {Request,Response} from 'express'
import {QueryResult} from 'pg'

export const getUsers = async (req:Request,res:Response) :Promise<Response> =>{
    try{
        
    
     return res.status(200).json();
 }
 catch(e){
     console.log(e);
     return res.status(500).json('Error en el sevidor (grifin no tuvo la culpa )')
 }
 
 }