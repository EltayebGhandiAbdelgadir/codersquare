import { RequestHandler } from "express";

export const RequestLogger : RequestHandler = (req,res,next)=>{
    console.log(req.method,req.path," - body:",req.body);
    next();
};