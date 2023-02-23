import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { store } from "./store";

export default class PostStore {
    posts: Post[] | null = null;
    loadingPosts = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadUserPosts = async (id: string) => {
        this.loadingPosts = true;
        try {
            const posts = await agent.Posts.getUserPosts(id);
            runInAction(() => {
                this.posts = posts;
                this.loadingPosts = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

}