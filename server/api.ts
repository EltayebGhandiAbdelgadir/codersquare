import { Post, User } from "./types";

// Post API
export interface ListPostsRequest{};
export interface ListPostsResponse{
    posts:Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {};

export interface GetPostRequest{};
export interface GetPostResponse{
    post:Post;
}

// User API

export type SignUpRequest = Pick<User, "email" | "firstName" | "lastName" | "username"| "password">;
export interface SignUpResponse {
    jwt: string;
};

export interface SignInRequest{
    log: string;
    password:string;
}
export type SignInResponse ={
    user: Pick<User, "email" | "firstName"| "lastName" | "username"| "id">;
    jwt:string;
}