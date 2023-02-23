import { Tag } from "./tag";
import { User } from "./user";

export interface Post {
    postId: number;
    imageUrl: string;
    description: string;
    createdAt: string;
    user: User;
    tags: Tag[];
    comments: Comment[];
    likesCount: number;
}