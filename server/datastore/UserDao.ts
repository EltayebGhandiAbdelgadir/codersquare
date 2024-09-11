import {User} from "../types";

export interface UserDao{
    createUsser(user:User):void;
    getUserByEmail(email:string):User | undefined;
    getUserByUsername(email:string):User|undefined;
}