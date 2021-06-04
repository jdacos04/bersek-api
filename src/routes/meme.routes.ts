import {Router} from 'express'
import { Request, Response } from "express";
const router = Router();


router.get('/hello',(req: Request, res: Response) => {
    return res.status(200).json({
        messge:"hola llegaste hasta aquie tomate un tiempo para descansar y mirar unos videitos",
        video:"https://www.youtube.com/watch?v=ue9vBU0bjA4",
        video1:"https://www.youtube.com/watch?v=mp28JPs25ek",
        video2:"https://www.youtube.com/watch?v=QPb_9-csknk",
        video3:"https://www.youtube.com/watch?v=58D3Qh2oDIs",
        video4:"https://www.youtube.com/watch?v=E5ONTXHS2mM",
        
    })
  });








export default router;