
import {Request,Response} from 'express'
import multer from '../config/multer'
import {pool} from '../db'
import fs from 'fs-extra'
import path from 'path'



export const getAllImg = async (req: Request, res: Response): Promise<Response> =>{
    const photos = await  pool.query('SELECT * FROM img');
    console.log(photos.rows);
     return res.status(200).json(photos.rows);
   
};



export const imgCreate = async (req:Request,res:Response) :Promise<Response> =>{
    const { title, description } = req.body;
    

     const photo = pool.query('INSERT INTO img (img_title, img_description,imgpath) VALUES ($1, $2,$3)', 
     [req.body.title,req.body.description,req.file.path, ]);

    return res.status(200).json({
        message: 'imagen subida',
        
    });
    

 
 }

 export const getImgById= async(req: Request, res: Response): Promise<Response>=> {
    const { id } = req.params;
    const photo = await pool.query ('SELECT * FROM img WHERE img_id = $1',[id])
    return res.status(200).json(photo.rows[0]);
}



export const imgDelete= async (req: Request, res: Response): Promise<Response> =>{
    const { id } = req.params;
    const photo = await pool.query ('SELECT * FROM img WHERE img_id = $1',[id])
    const confiPhoto =photo.rows[0]
    if(!confiPhoto){
        return res.status(400).json('la foto no existe')
    }
     const photodel =  await pool.query('DELETE FROM img WHERE  img_id = $1', [
        id
    ]);
    if (photodel) {
        
        await fs.unlink(path.resolve(confiPhoto.imgpath));
    }
    return res.status(200).json({ message: 'imagen borrada' });
};

export const imgUpdate= async(req: Request, res: Response): Promise<Response> =>{
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await pool.query('UPDATE img SET img_title = $1,img_description = $2 WHERE img_id = $3', [
        title,
        description,
        id ]);
    return res.status(200).json({
        message: 'imagen actualizada',
        title,
        description,
        id
    });
}