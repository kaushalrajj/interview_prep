import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    problem:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        Enume:["easy","medium","hard"],
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
        type:String,
        enum:["pending","active"],
        default:"active"
    },
    callId:{
        type: String,
        default:""
    },
    timestamps:true
});

export default Session