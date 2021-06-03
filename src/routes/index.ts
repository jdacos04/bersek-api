import {Router} from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/index.controllers';
import passport from 'passport'
const router = Router();


const visa = passport.authenticate('jwt',{session:false})



router.get('/users', visa,getUsers);

router.get('/users/:id',visa, getUserById);

router.post('/users', visa, createUser);

router.put('/users/:id',visa, updateUser);

router.delete('/users/:id',visa, deleteUser);




export default router;
