import express from 'express'
import morgan from 'morgan';
import path from 'path'
import indexRoutes from './routes/index';
import auth from './routes/auth.routes'
import cors from 'cors';
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import multer from 'multer'
import {v4 as uuivd4, v4}  from 'uuid'
//inicializaciones
const app =express();
const rename = multer.diskStorage({
    destination:path.join(__dirname, 'public/upload'),
    filename:(req,file,cb)=>{
        cb( null, v4() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

//configuraciones
app.set('port', process.env.PORT||4000);



//midelwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(multer({
    storage:rename,
    dest:path.join(__dirname, 'public/upload'),
    fileFilter:(req,file,cb)=>{
        const filetypes =/jpeg|jpg|png|gif/;
        const minetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if(minetype && extname){
            return cb(null,true);
        }
        
    }
}).single('image'));
 

//rutes
app.use(indexRoutes);
app.use(auth);









export default app;