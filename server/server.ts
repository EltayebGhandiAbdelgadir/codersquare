import express, {ErrorRequestHandler, RequestHandler}from 'express';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import asyncHandler from "express-async-handler"
import { initDb } from './datastore';
import {signInHandler, signUpHandler } from './handlers/authHandlers';
import { RequestLogger } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from "dotenv";
import { authMiddleware } from './middleware/authMiddleware';


(async()=>{
    await initDb();
    dotenv.config();

    const app = express();
    app.use(express.json());



    app.use(RequestLogger);


    
    //public endpoints
    app.post("/v1/signUp",asyncHandler(signUpHandler));
    app.post("/v1/signIn",asyncHandler(signInHandler))

    app.use(authMiddleware);

    //protected endpoints
    app.get("/v1/posts",asyncHandler(listPostHandler));
    app.post("/v1/posts",asyncHandler(createPostHandler));

   





    app.use(errHandler);
    app.listen(3000);

})();