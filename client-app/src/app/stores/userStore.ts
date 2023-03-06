import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Auth } from "../models/auth";
import { User } from "../models/user";
import { router } from "../router/router";

export default class UserStore {
    currentUser: User | null = null;
    token: string | null = localStorage.getItem("jwt");

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token) {
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

    setToken = (token: string | null) => {
        this.token = token;
    }

    login = async (creds: Auth) => {
        try {
            const authResponse = await agent.Account.login(creds);
            this.setToken(authResponse.token);
            runInAction(() => this.currentUser = authResponse.user);
            router.navigate(`/profile/${this.currentUser?.username}`);
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: Auth) => {
        try {
            await agent.Account.register(creds);
            router.navigate("/");
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        this.setToken(null);
        this.currentUser = null;
        router.navigate("/");
    }

    // setImage = (image: string) => {
    //     if (this.user) {
    //         this.user.image = image;
    //     }
    // }

    // setDisplayName = (displayName: string) => {
    //     if (this.user) {
    //         this.user.displayName = displayName;
    //     }
    // }
}