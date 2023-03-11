import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    followings: User[] = [];
    followers: User[] = [];
    loadingFollowings: boolean = false;
    loadingFollowers: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.currentUser && this.profile) {
            return store.userStore.currentUser.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadFollowers();
                this.loadFollowings();
                this.loadingProfile = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    loadFollowings = async () => {
        this.loadingFollowings = true;

        try {
            const followings = await agent.Profiles.getFollowings(this.profile!.id);
            
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingFollowings = false);
        }
    }

    loadFollowers = async () => {
        this.loadingFollowings = true;

        try {
            const followers = await agent.Profiles.getFollowers(this.profile!.id);

            runInAction(() => {
                this.followers = followers;
                this.loadingFollowers = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingFollowers = false);
        }
    }
    
    // uploadPhoto = async (file: Blob) => {
    //     this.uploading = true;

    //     try {
    //         const response = await agent.Profiles.uploadPhoto(file);
    //         const photo = response.data;
    //         runInAction(() => {
    //             if (this.profile) {
    //                 this.profile.photos?.push(photo);
    //                 if (photo.isMain && store.userStore.user) {
    //                     store.userStore.setImage(photo.url);
    //                     this.profile.image = photo.url;
    //                 }
    //             }
    //             this.uploading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.uploading = false);
    //     }
    // }

    // setMainPhoto = async (photo: Photo) => {
    //     this.loading = true;

    //     try {
    //         await agent.Profiles.setMainPhoto(photo.id);
    //         store.userStore.setImage(photo.url);
    //         runInAction(() => {
    //             if (this.profile && this.profile.photos) {
    //                 this.profile.photos.find(p => p.isMain)!.isMain = false;
    //                 this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
    //                 this.profile.image = photo.url;
    //             }
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.loading = false);
    //     }
    // }

    // deletePhoto = async (photo: Photo) => {
    //     this.loading = true;

    //     try {
    //         await agent.Profiles.deletePhoto(photo.id);
    //         runInAction(() => {
    //             if (this.profile) {
    //                 this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
    //             }
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.loading = false);
    //     }
    // }

    // updateProfile = async (profile: Partial<Profile>) => {
    //     this.loading = true;

    //     try {
    //         await agent.Profiles.updateProfile(profile);
    //         runInAction(() => {
    //             if (profile.displayName && profile.displayName !==
    //                 store.userStore.user?.displayName) {
    //                 store.userStore.setDisplayName(profile.displayName);
    //             }
    //             this.profile = { ...this.profile, ...profile as Profile };
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.loading = false);
    //     }
    // }
}