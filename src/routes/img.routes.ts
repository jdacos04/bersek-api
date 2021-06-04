import {Router} from 'express'
import passport from 'passport'
import multer from '../config/multer'
import {imgCreate,imgDelete,imgUpdate,getAllImg,getImgById} from '../controllers/img.controller'
const router = Router();
const visa = passport.authenticate('jwt',{session:false})


router.get('/img',getAllImg);//todas las imagenes
router.post('/img',multer.single('image'),imgCreate);

router.get('/img/:id',getImgById);
router.delete('/img/:id',imgDelete);
router.put('/img/:id',imgUpdate);









export default router;
