import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
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
                    this.comments = comments; 
                });
            });

            this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
                runInAction(() => { 
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