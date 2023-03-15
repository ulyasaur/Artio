import { Photo } from "./photo";
import { Tag } from "./tag";

export interface Profile {
    id: string;
    username: string;
    displayName: string;
    image?: Photo;
    background?: Photo;
    bio?: string;
    followersCount: number;
    followingsCount: number;
    following: boolean;
    tags: Tag[];
}