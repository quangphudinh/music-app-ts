import {Express , Request , Response} from 'express';
import express = require('express');
import * as database from './config/database';
import * as dotenv from 'dotenv';

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

app.get("/topics" , (req : Request , res : Response) => {
    res.render("client/pages/topics/index.pug")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})