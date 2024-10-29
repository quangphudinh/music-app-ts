import {Express } from 'express';
import express = require('express');
import * as database from './config/database';
import * as dotenv from 'dotenv';

import clientRoutes from './routers/client/index.router';
import adminRoutes from './routers/admin/index.router';
import { systemConfig } from './config/config';
import path = require('path');


dotenv.config();
database.connect();

const app : Express = express();
const port : number | string = process.env.PORT || 3000;
//PUG
app.set('views', './views');
app.set('view engine', 'pug');
//END PUG

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname , "node_modules", 'tinymce')));
//END TinyMCE

app.use(express.static('public'));

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mainV1Routes(app);

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routes
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})