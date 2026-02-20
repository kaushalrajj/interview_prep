console.log("starting server....");

import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";

dotenv.config();

const app = express();

app.get("/health",(req,res)=>{
    res.status(200).json({message:"okay apis working herre babe "})
})

const PORT = ENV.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on the port ${ENV.PORT}`);
})