import { CommentDao } from "./CommentDao"
import { LikeDao } from "./Dao/LikeDao";
// import { InMemoryDatastore } from "./memorydb";
import { PostDao } from "./Dao/PostDao";
import {UserDao} from "./Dao/UserDao";
import { SqlDataStore } from "./sql";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {};

export let db: Datastore;

export async function initDb(){
    // db = new InMemoryDatastore();
    db = await new SqlDataStore().openDb();
}

 
