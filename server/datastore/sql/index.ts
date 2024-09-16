import {Database, open as sqliteOpen} from "sqlite";
import  sqlite3 from "sqlite3";
import path from "path";

import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";
import { userInfo } from "os";
import { lstatSync } from "fs";

export class SqlDataStore implements Datastore{
   
    private db!:Database<sqlite3.Database,sqlite3.Statement>
    public async openDb() {
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database,
        });
    this.db.run("PRAGMA foreign_key = on;");
    
        await this.db.migrate({
            migrationsPath: path.join(__dirname,"migrations")
        });

        return this;
    }
    
    async createUser(user: User): Promise<void> {
        await this.db.run("INSERT INTO users (id,email,password,firstName,lastName,username) VALUES (?,?,?,?,?,?)",
            user.id,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.username
        );
    };
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>("Select * From users Where email = ?",email);
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>("Select * from users where username = ?",username);
    }
    listPosts(): Promise<Post[]> {
        // throw new Error("Method not implemented.");
        return this.db.all<Post[]>("SELECT * FROM posts");
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id,title,url,postedAt,userId) VALUES (?,?,?,?,?)',
            post.id,
            post.title,
            post.url,
            post.postedAt,
            post.userId
        );
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): void {
        throw new Error("Method not implemented.");
    }
    listComment(postId: string): Comment[] {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): void {
        throw new Error("Method not implemented.");
    }
    
};