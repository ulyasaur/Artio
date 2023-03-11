export interface User {
    id: string;
    username: string;
    displayName: string;
    imageUrl?: string;
}

export class User implements User {
    constructor (
        id: string, 
        username: string, 
        displayName: string, 
        imageUrl?: string){
            this.id = id;
            this.username = username;
            this.displayName = displayName;
            this.imageUrl = imageUrl;
    }
}