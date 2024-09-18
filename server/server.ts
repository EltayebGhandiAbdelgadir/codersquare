import express, {ErrorRequestHandler, RequestHandler}from 'express';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import asyncHandler from "express-async-handler"
import { initDb } from './datastore';
import {signInHandler, signUpHandler } from './handlers/authHandlers';
import { RequestLogger } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';

(async()=>{
    await initDb();

const app = express();
app.use(express.json());



app.use(RequestLogger);


app.get("/v1/posts",asyncHandler(listPostHandler));
app.post("/v1/posts",asyncHandler(createPostHandler));

app.post("/v1/signUp",asyncHandler(signUpHandler));
app.post("/v1/signIn",asyncHandler(signInHandler))






app.use(errHandler);
app.listen(3000);

})();