import express, { Router, request, response } from "express";
import { Port, mongoUrl } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import cors from 'cors';
// cross origin resource sharing 
// so that the front end can send request to the backend

import bookRouter from './Router/bookRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

app.listen(Port, () => {
    console.log(`Sereve is listenneg  at Port ${Port}`);
})

app.use('', bookRouter);

mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Appp is connected to the DataBase");
    })
    .catch((error) => {
        console.log(error);
    });    
