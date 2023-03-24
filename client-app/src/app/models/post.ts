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

export class PostFormValues {
    postId: number | undefined = undefined;
    image: Blob | null = null;
    description: string = "";
    tags: Tag[] = [];

    constructor(postId?: number,
        image?: Blob,
        description?: string,
        tags?: Tag[]) {
        if (postId && image && description && tags) {
            this.postId = postId;
            this.image = image;
            this.description = description;
            this.tags = tags;
        }
    }
}