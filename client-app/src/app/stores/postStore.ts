import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { store } from "./store";

export default class PostStore {
    posts: Post[] | null = null;
    post: Post | null = null;
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

    isLiked(post: Post) {
        const userId = store.userStore.currentUser?.id;

        return !!post?.likes.find(x => x.userId === userId);
    }

    loadPost = async (postId: string) => {
        this.loadingPosts = true;
        try {
            const post = await agent.Posts.getPost(postId);
            runInAction(() => {
                this.post = post;
                this.loadingPosts = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

}