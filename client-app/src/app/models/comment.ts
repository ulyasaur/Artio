import { User } from "./user";

export interface ChatComment {
    id: number;
    createdAt: any;
    body: string;
    user: User;
}