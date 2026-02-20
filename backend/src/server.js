console.log("starting server....");

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.get("/health",(req,res)=>{
    res.status(200).json({message:"okay apis working herre babe "})
})

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
});
}
const PORT = ENV.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on the port ${ENV.PORT}`);
})