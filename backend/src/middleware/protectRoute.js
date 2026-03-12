import {requireAuth} from '@clerk/express'
import User from '../models/User.js'

export const protectRoute = [
    requireAuth({ signInUrl: "/sign-in"}),
    async(req,res,next)=>{
        try{
            const clerkId = req.auth().userId;
            if(!clerkId)return res.status(401).json({msg:"unauthorised access"});
            const user = await User.findOne({clerkId})
            if(!User)return res.status(404).json({msg:"user not found"})

                req.user = user
                next()
        }
        catch(error){
            console.error("eroor in protecroute middleware",error);
            res.status(500).json({msg:"internal serer error"})
        }
    },
];