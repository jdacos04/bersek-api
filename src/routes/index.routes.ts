import {Router} from 'express'
import {createNotes,getAllNotes,getNotesById,deleteNotes,updateNotes} from '../controllers/index.controllers';
import passport from 'passport'
const router = Router();


const visa = passport.authenticate('jwt',{session:false})



router.get('/notes',visa ,getAllNotes);

router.get('/notes/:id',visa, getNotesById);

router.post('/notes', visa,createNotes);

router.put('/notes/:id',visa,updateNotes );

router.delete('/notes/:id',visa, deleteNotes);




export default router;
