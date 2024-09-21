import { exit } from "process";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from "crypto";
import { signJwt } from "../auth";

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse>=async(req,res)=>{
    const {log, password}= req.body;
    if(!log || ! password){
        return res.sendStatus(400);
    }
    const existing = (await db.getUserByEmail(log)) || (await db.getUserByUsername(log));
    if(!existing || existing.password !== password){
      return res.sendStatus(403);
    }

    const jwt = signJwt({userId: existing.id})
    return res.status(200).send({
        user:{
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        username :existing.username,
        id: existing.id
        },
        jwt,
    });
    
};

export const signUpHandler:  ExpressHandler<SignUpRequest, SignUpResponse> = async(req,res) =>{
    const {email,firstName,lastName,username,password} = req.body;
    if(!email || !firstName || !lastName || !username || !password ){
        return res.status(400).send({error:"All fields are required!!"});
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if(existing){
        return res.status(403).send({error:"user is already exists"});
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
    const jwt = signJwt({userId: user.id});
    return res.status(200).send({
        jwt,
    });
} 
