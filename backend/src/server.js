console.log("starting server....");

import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDb } from "./lib/db.js";
import { start } from "repl";
import {serve} from "inngest/express";
import { functions } from "./lib/inngest.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();


app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use('/api/inngest',serve({client:inngest,functions}));

app.get("/health",(req,res)=>{
    res.status(200).json({message:"okay apis working herre babe "})
})

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("/*", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
});
}
// const PORT = ENV.PORT;
// app.listen(PORT,()=>{
//     console.log(`server is running on the port ${ENV.PORT}`);
//     connectDb();
// })

const startServer = async()=>{
    try{
        await connectDb();
        app.listen(ENV.PORT,()=> console.log(`server is running on port ${ENV.PORT}`))
    }
    catch(error){
        console.error(`server failed to start: ${error.message}`);
        process.exit(1);    
    }
}
startServer();