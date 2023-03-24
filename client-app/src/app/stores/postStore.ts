import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Like } from "../models/like";
import { Post, PostFormValues } from "../models/post";
import { router } from "../router/router";
import { store } from "./store";

export default class PostStore {
    userPosts: Post[] | null = null;
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
                this.userPosts = posts;
                this.loadingPosts = false;
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
                this.loadingPosts = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

    loadPosts = async (predicate: string) => {
        this.loadingPosts = true;
        try {
            let posts: Post[];

            if (predicate === "tags") {
                posts = await agent.Posts.getPostsByUserTags();
            } else {
                posts = await agent.Posts.getPostsByFollowings();
            }

            runInAction(() => {
                this.posts = posts;
                this.loadingPosts = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

    createPost = async (post: PostFormValues) => {
        this.loadingPosts = true;
        try {
            const addedPost = (await agent.Posts.addPost(post)).data;
            runInAction(() => {
                this.post = addedPost;
                if (store.postStore.userPosts) {
                    store.postStore.userPosts.unshift(addedPost);
                }
                this.loadingPosts = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

    updatePost = async (post: PostFormValues) => {
        this.loadingPosts = true;
        try {
            await agent.Posts.updatePost(post);
            runInAction(() => {
                this.loadingPosts = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

    deletePost = async (postId: number) => {
        this.loadingPosts = true;
        try {
            await agent.Posts.deletePost(postId);
            router.navigate("/");
            runInAction(() => {
                if (store.postStore.userPosts) {
                    store.postStore.userPosts = store.postStore.userPosts.filter(p => p.postId !== postId);
                }
                this.post = null;
                this.loadingPosts = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingPosts = false);
        }
    }

    toggleLike = async (post: Post) => {
        try {
            await agent.Posts.toggleLike(post.postId.toString());
            const userId = store.userStore.currentUser?.id;

            runInAction(() => {
                if (this.isLiked(post)) {
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