import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { Tag } from "../models/tag";
import { User } from "../models/user";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading: boolean = false;
    followings: User[] = [];
    followers: User[] = [];
    searchedUsers: User[] | null = null;
    loadingSearch: boolean = false;
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
                this.loadingProfile = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    loadSearchedUsers = async (search: string) => {
        this.loadingSearch = true;

        try {
            const users = await agent.Profiles.getSearchedUsers(search);

            runInAction(() => {
                this.searchedUsers = users;
                this.loadingSearch = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingSearch = false);
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

    updateProfile = async (profile: Partial<Profile>) => {
        this.uploading = true;

        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !==
                    store.userStore.currentUser?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.uploading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    uploadProfilePicture = async (file: Blob) => {
        this.uploading = true;

        try {
            const response = await agent.Profiles.uploadProfilePicture(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.image = photo;
                    store.userStore.setImage(photo);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    uploadBackgroundPicture = async (file: Blob) => {
        this.uploading = true;

        try {
            const response = await agent.Profiles.uploadProfileBackground(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.background = photo;
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    addTagToUser = async (tag: Tag) => {
        this.uploading = true;
        
        try {
            await agent.Profiles.addTag(tag.tagId);

            runInAction(() => {
                store.userStore.tags.push(tag);

                if(this.profile && this.profile?.id === store.userStore.currentUser?.id) {
                    this.profile.tags.push(tag);
                }

                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    deleteTagFromUser = async (tag: Tag) => {
        this.uploading = true;
        
        try {
            await agent.Profiles.deleteTag(tag.tagId);

            runInAction(() => {
                store.userStore.tags = store.userStore.tags.filter(t => t.tagId !== tag.tagId);

                if(this.profile && this.profile?.id === store.userStore.currentUser?.id) {
                    this.profile.tags = this.profile?.tags.filter(t => t.tagId !== tag.tagId);
                }

                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
}