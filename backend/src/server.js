
import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoute from "./routes/chatRoutes.js"

import {clerkMiddleware} from "@clerk/express"
import dotenv from "dotenv";
import { start } from "repl";
dotenv.config();

const app = express();
const __dirname = path.resolve();


app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(clerkMiddleware());
app.use('/api/inngest',serve({client:inngest,functions}));
app.use('/api/chat',chatRoute)

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
        await connectDB();
        app.listen(ENV.PORT,()=> console.log(`server is running on port ${ENV.PORT}`))
    }
    catch(error){
        console.error(`server failed to start: ${error.message}`);
        process.exit(1);    
    }
}
startServer();