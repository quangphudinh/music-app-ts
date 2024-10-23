import {Express } from 'express';
import express = require('express');
import * as database from './config/database';
import * as dotenv from 'dotenv';

import clientRoutes from './routers/client/index.router';


dotenv.config();
database.connect();

const app : Express = express();
const port : number | string = process.env.PORT || 3000;
//PUG
app.set('views', './views');
app.set('view engine', 'pug');
//END PUG



// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mainV1Routes(app);

//client routes
clientRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})