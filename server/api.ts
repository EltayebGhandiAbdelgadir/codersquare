import { Post } from "./types";

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

