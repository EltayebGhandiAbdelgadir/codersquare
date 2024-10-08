import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";

export class InMemoryDatastore implements Datastore{
   
    listPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserById(id:string):Promise<User | undefined>{
        return Promise.resolve(this.users.find(u => u.id === id));
    }
    getUserByEmail(email: string): Promise<User | undefined> {
       return Promise.resolve(this.users.find(u => u.email === email));
    }
    getUserByUsername(email: string): Promise<(User | undefined)> {
        return Promise.resolve(this.users.find(u => u.username === email));
    }
    // listPosts(): Promise<Post[]> {
    //     return this.posts;
    // }
    createPost(post: Post): Promise<void> {
       this.posts.push(post);
       return Promise.resolve();
    }
    getPost(id: string): Promise<Post | undefined>{
       return Promise.resolve(this.posts.find(p => p.id === id));
    }
    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(p => p.id === id);
        if(index === -1){
            return Promise.resolve();
        }
        this.posts.splice(index,1);
        return Promise.resolve();
    }
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    createComment(comment: Comment): void {
       this.comments.push(comment);
    }
    listComment(postId: string): Comment[] {
       return this.comments.filter(c => c.postId === postId);
    }
    deleteComment(id: string): void {
        const commentIndex = this.comments.findIndex(c => c.id === id);
        if(commentIndex === -1){
            return;
        }
        this.comments.splice(commentIndex,1);
    }
}