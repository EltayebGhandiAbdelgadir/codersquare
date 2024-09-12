import { CommentDao } from "./CommentDao"
import { LikeDao } from "./Dao/LikeDao";
import { InMemoryDatastore } from "./memorydb";
import { PostDao } from "./Dao/PostDao";
import {UserDao} from "./Dao/UserDao";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {};

export const db = new InMemoryDatastore();
