"use strict";


 

/* --------------------------------- imports -------------------------------- */
const express =require('express')
require('express-async-errors')
require('dotenv').config();
// import swagger ui module and swagger json file
// const swJsonDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const path = require('path');
const validateToken = require('./src/middlewares/validateTokenHandler');
const cors = require('cors')

/* ----------------------------------- app ---------------------------------- */
const app = express();

/* ------------------------------ db connection ----------------------------- */
require('./src/config/dbConnection')();

// /* --------------------------------- swagger -------------------------------- */
// const options = require('./src/config/swagger.json'); 
// const swaggerSpecs = swJsonDoc(options);

// // add route for swagger document API
// app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use('/swagger', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));

//* -----------| -Swagger- |-----------

// import swagger ui module and swagger json file
const swJsonDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger/swagger.json");

const options = require('./src/config/swagger.json');
const swaggerSpecs = swJsonDoc(options);

// add route for swagger document API
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/swagger', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));



  
/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
//authentication -> individual!
//queryHandler
app.use(require('./src/middlewares/queryHandler'));
 
app.use(cors()) //cors

/* --------------------------------- routes --------------------------------- */
app.all('/',(req,res)=>{
    res.send('Welcome to the BS-Store Api!')
})


app.use('/users',require('./src/routes/userRouter')); 
app.use('/auth',require('./src/routes/authRouter')); 
app.use('/categories',validateToken ,require('./src/routes/categoryRouter')); 
app.use('/products',validateToken,require('./src/routes/productRouter')); 



/* ------------------------------ errorHandler ------------------------------ */
app.use(require('./src/middlewares/errorHandler'));


/* ---------------------------------- port ---------------------------------- */
const PORT = process.env.PORT;
app.listen(PORT,()=> console.log('Server is running on',PORT));



// require('./sync')()


//* -ok 100tane user olsuturdum
//* -ok user controllerini yazacam
//* -ok ama once swagger
//* -ok query handler sonra
//* -ok sonra auth route controller
//* -ok sonra token validation
//* -ok sonra products controller route vs
//* -ok category controller s

//* -ok en son neler token sitior ayarlanacak
//* -ok bi admin koyup user get delete vs islemlerini admine verecem sadece

//* -ok exprie time ayarla en son


 

// require('./sync2')() 