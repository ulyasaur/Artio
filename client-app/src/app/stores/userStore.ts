import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Auth } from "../models/auth";
import { User } from "../models/user";
import { router } from "../router/router";
import { store } from "./store";

export default class UserStore {
    currentUser: User | null = null;
    followings: User[] = [];
    token: string | null = localStorage.getItem("jwt");
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem("jwt", token);
                } else {
                    localStorage.removeItem("jwt");
                }
            }
        );
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    isFollowing = (userId: string) => {
        return !!this.followings.find(f => f.id === userId);
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    login = async (creds: Auth) => {
        try {
            const authResponse = await agent.Account.login(creds);
            this.setToken(authResponse.token);
            
            runInAction(() => {
                this.currentUser = authResponse.user;
            });
            
            router.navigate(`/profile/${this.currentUser?.username}`);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: Auth) => {
        try {
            await agent.Account.register(creds);
            await this.login(creds);
            toast.success("You're successfully registered!");
        } catch (error) {
            console.log(error);
        }
    }

    logout = () => {
        this.setToken(null);
        this.currentUser = null;
        router.navigate("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();            
            const followings = await agent.Profiles.getFollowings(user.id);

            runInAction(() => {
                this.currentUser = user;
                this.followings = followings;
            });
        } catch (error) {
            console.log(error);
        }
    }

    toggleFollowing = async (user: User) => {
        this.loading = true;

        try {
            await agent.Profiles.toggleFollow(user.id);
            runInAction(() => {
                if(this.isFollowing(user.id)){
                    this.followings = this.followings.filter(f => f.id !== user.id);
                    if(store.profileStore.profile) {
                        store.profileStore.followers! = store.profileStore.followers!.filter(f => f.id !== this.currentUser?.id);
                        store.profileStore.profile.followersCount--;
                    }
                }
                else {
                    if(store.profileStore.profile) {
                        store.profileStore.followers.push(this.currentUser!);
                        store.profileStore.profile.followersCount++;
                    }
                    this.followings.push(user);
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}