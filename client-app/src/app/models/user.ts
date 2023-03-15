import { Photo } from "./photo";

export interface User {
    id: string;
    username: string;
    displayName: string;
    image?: Photo;
}

export class User implements User {
    constructor (
        id: string, 
        username: string, 
        displayName: string, 
        image?: Photo){
            this.id = id;
            this.username = username;
            this.displayName = displayName;
            this.image = image;
    }
}