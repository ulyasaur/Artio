import { Tag } from "./tag";

export interface Profile {
    id: string;
    username: string;
    displayName: string;
    imageUrl?: string;
    backgroundUrl?: string;
    bio?: string;
    followersCount: number;
    followingsCount: number;
    following: boolean;
    tags: Tag[];
}