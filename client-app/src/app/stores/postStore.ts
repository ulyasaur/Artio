import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Like } from "../models/like";
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

    toggleLike = async (post:Post) => {
        try {
            await agent.Posts.toggleLike(post.postId.toString());
            const userId = store.userStore.currentUser?.id;

            runInAction(() => {
                if(this.isLiked(post)) {
                    post.likes = post.likes.filter(l => l.userId !== userId);
                }
                else {                    
                    post.likes.push(new Like(post.postId, userId!));
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}