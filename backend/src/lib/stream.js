import {StreamChat} from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("stream APi key or secret dont exist")
}

export const chatClient = StreamChat.getInstance(apiKey,apiSecret)
export const streamClient = new StreamClient(apiKey,apiSecret);

export const upsertStreamUser = async(userData)=>{
    try{
        await chatClient.upsertUser(userData)
        console.log("stream user upserted succesfully",userData)
    }
    catch(error){
        console.error("error upserting stream user",error)
    }
}

export const deleteStreamUser = async(userId)=>{
    try{
        await chatClient.deleteUser(userId)
        console.log("stream user deleted succesfully :",userId);
    }
    catch(error){
        console.error("error deleting stream user",error)
    }
}