import { exit } from "process";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from "crypto";

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse>=async(req,res)=>{
    const {log, password}= req.body;
    if(!log || ! password){
        return res.sendStatus(400);
    }
    const existing = (await db.getUserByEmail(log)) || (await db.getUserByUsername(log));
    if(!existing || existing.password !== password){
      return res.sendStatus(403);
    }

    return res.status(200).send({
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        username :existing.username,
        id: existing.id
    });
    
}   ;

export const signUpHandler:  ExpressHandler<SignUpRequest, SignUpResponse> = async(req,res) =>{
    const {email,firstName,lastName,username,password} = req.body;
    if(!email || !firstName || !lastName || !username || !password ){
        return res.status(400).send("All fields are required!!");
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if(existing){
        return res.status(403).send("user is already exists");
    }
    
    const user: User = {
        id:crypto.randomUUID(),
        firstName,
        lastName,
        username,
        email,
        password
    };

    await db.createUser(user);
    return res.sendStatus(200);
} 
