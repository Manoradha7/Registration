import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

import { EmployeeRouter } from './routes/employee.js';

const app = express();

dotenv.config();
//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/employee',EmployeeRouter)

const Mongo_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

//create connection to database
async function createConnection(){
    const client = new  MongoClient(Mongo_URL);
    await client.connect();
    console.log("MongoDb has Started");
    return client;
}

export const client = await createConnection();

//Make app to listen the Port
app.listen(PORT,console.log("App is Running in Port",PORT))

app.get("/",(req,res)=>{
    res.send("Welcome")
})