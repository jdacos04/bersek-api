import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import {pool} from '../db'


export const getAllNotes= async (req:Request,res:Response) :Promise<Response> =>{
   try{
       const response: QueryResult = await pool.query('SELECT * FROM notes');
   console.log(response.rows);
    return res.status(200).json(response.rows);
}
catch(e){
    console.log(e);
    return res.status(500).json('Error en el sevidor ')
}

}


export const getNotesById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM notes WHERE notes_id = $1', [id]);
    return res.status(200).json(response.rows);
};

export const createNotes = async (req: Request, res: Response) => {
    const { title, text } = req.body;
    console.log(req.body.titel)
    const response = await pool.query('INSERT INTO notes ( note_title , note_text) VALUES ($1, $2)', [req.body.title,req.body.text]);
    res.status(200).json({
        message: 'nota creada ',
        body: {
            note: { title, text }
        }
    })
};

export const updateNotes = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, text } = req.body;

    const response = await pool.query('UPDATE notes SET note_title = $1, note_text = $2 WHERE notes_id = $3', [title, text,id ]);
    res.status(200).json({message:'Nota actualiada adecuadamente',
            body:{
                note:{title, text}
            }});

};

export const deleteNotes = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM notes WHERE notes_id = $1', [
        id
    ]);
    res.json(`la nota con el ${id} fue eliminada `);
};

