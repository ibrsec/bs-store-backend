"use strict";




/* --------------------------------- imports -------------------------------- */
const express =require('express')
require('express-async-errors')
require('dotenv').config();

/* ----------------------------------- app ---------------------------------- */
const app = express();

/* ------------------------------ db connection ----------------------------- */
require('./src/config/dbConnection')();

/* --------------------------------- swagger -------------------------------- */

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
//authentication
//queryHandler


/* --------------------------------- routes --------------------------------- */
app.all('/',(req,res)=>{
    res.send('working\'')
})


app.use('/user',require('./src/routes/userRouter'));



/* ------------------------------ errorHandler ------------------------------ */



/* ---------------------------------- port ---------------------------------- */
const PORT = process.env.PORT;
app.listen(PORT,()=> console.log('Server is running on',PORT));



