import {Router} from 'express'
import {signIn,signUp,getUsersById,deleteUser,updateUsers} from '../controllers/auth.controllers'
import passport from 'passport'


const router = Router();
const visa = passport.authenticate('jwt',{session:false})

//login y register
router.post('/signup', signUp);
router.post('/signin', signIn);
//otras acciones con el usuario 
router.get('/users/:id',visa,getUsersById);
router.delete('/users/:id',visa,deleteUser);
router.put('/users/:id',visa,updateUsers);





export default router;