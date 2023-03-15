import { Like } from "./like";
import { Photo } from "./photo";
import { Tag } from "./tag";
import { User } from "./user";

export interface Post {
    postId: number;
    image: Photo;
    description: string;
    createdAt: string;
    user: User;
    commentCount: number;
    tags: Tag[];
    likes: Like[];
}