import express from 'express'
import morgan from 'morgan';
import indexRoutes from './routes/index';
import auth from './routes/auth.routes'
import cors from 'cors';

//inicializaciones
const app =express();


//configuraciones
app.set('port', process.env.PORT||4000);



//midelwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//rutes
app.use(indexRoutes);
app.use(auth);









export default app;