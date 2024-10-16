import express from "express";
import cors from "cors";
import connection from "../db/db.js";

const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true,limit: '16kb'}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

import { router } from './routes/book.routes.js'

app.use("/",router)



export default app;

