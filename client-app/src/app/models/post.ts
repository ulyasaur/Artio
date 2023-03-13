import { Like } from "./like";
import { Tag } from "./tag";
import { User } from "./user";

export interface Post {
    postId: number;
    imageUrl: string;
    description: string;
    createdAt: string;
    user: User;
    commentCount: number;
    tags: Tag[];
    likes: Like[];
}