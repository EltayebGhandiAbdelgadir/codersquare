import {User} from "../../types";

export interface UserDao{
    createUsser(user:User):Promise<void>;
    getUserByEmail(email:string):Promise<User | undefined>;
    getUserByUsername(email:string):Promise<User|undefined>;
}