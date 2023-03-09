import { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (postId: number) => {
        if (store.postStore.post) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7157/chat?postId=" + postId, {
                    accessTokenFactory: () => store.userStore.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch((error : any) => console.log("Error establishing the connection: ", error));

            this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
                runInAction(() => { 
                    // comments.forEach(comment => {
                    //     comment.createdAt = new Date(comment.createdAt + "Z");
                    // });
                    this.comments = comments; 
                });
            });

            this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
                runInAction(() => { 
                    //comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment); 
                });
            });
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch((error : any) => console.log("Error stopping connection: ", error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values:any) => {
        values.postId = store.postStore.post?.postId;

        try {
            await this.hubConnection?.invoke("SendComment", values);
        } catch (error) {
            console.log(error);
        }
    }
}