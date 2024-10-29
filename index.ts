import {Express } from 'express';
import express = require('express');
import * as database from './config/database';
import * as dotenv from 'dotenv';
// import bodyParser = require('body-parser');

import clientRoutes from './routers/client/index.router';
import adminRoutes from './routers/admin/index.router';
import { systemConfig } from './config/config';
import path = require('path');


dotenv.config();
database.connect();

const app : Express = express();
const port : number | string = process.env.PORT || 3000;

// Body parser
// (Nếu dùng cái này thì k cần cài body parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PUG
app.set('views', './views');
app.set('view engine', 'pug');
//END PUG

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname , "node_modules", 'tinymce')));
//END TinyMCE

app.use(express.static('public'));

// app.use(cors());



// mainV1Routes(app);

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routes
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})