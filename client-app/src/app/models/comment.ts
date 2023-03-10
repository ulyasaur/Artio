import { User } from "./user";

export interface ChatComment {
    commentId: number;
    createdAt: any;
    body: string;
    user: User;
}