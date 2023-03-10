import { User } from "./user";

export interface Like {
    postId: number;
    userId: string;
}

export class Like implements Like {
    constructor(postId: number, userId:string) {
        this.postId = postId;
        this.userId = userId;
    }
}