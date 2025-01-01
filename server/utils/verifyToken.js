import { createError } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    console.log("req",req.cookies)
    const token = req.cookies.accessToken
   
    if(!token){
        return next(createError(401,"You Are Not Authenticated"))
    }

    jwt.verify(token,process.env.jwt,(err,user)=>{
        if(err) {
            return next(createError(403,"Token is not Valid"))
        }
        req.user = user;
       
        next()
    })

    
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are Not Authorized!"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    
    verifyToken(req,res,next,()=>{
        
        if(req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are Not Authorized!"))
        }
    })
}