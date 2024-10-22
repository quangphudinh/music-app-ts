import {Express , Request , Response} from 'express';
import express = require('express');


// dotenv.config();
// database.connect();

const app : Express = express();
const port : number | string = process.env.PORT || 3000;

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mainV1Routes(app);

app.get("/topics" , (req : Request , res : Response) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})