import express from 'express'
import morgan from 'morgan';
import path from 'path'
import indexRoutes from './routes/index.routes';
import auth from './routes/auth.routes'
import imgRoutes from './routes/img.routes'
import meme from './routes/meme.routes'
import cors from 'cors';
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import multer from 'multer'

//inicializaciones
const app =express();


//configuraciones
app.set('port', process.env.PORT||4000);



//midelwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
passport.use(passportMiddleware);

//rutes
app.use('/upload',express.static(path.resolve('uploads')));
app.use(indexRoutes);
app.use(auth);
app.use(imgRoutes);
app.use(meme);









export default app;