import { Pool } from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'princho4',
    database: 'berseke',
    port: 5432
});

//recuerda moverlo a un archivo .env para que sea mas seguro 
// export const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     password: process.env.PASSWORD,
//     database: process.env.DB,
//     port: process.env.PUERTO
// });