import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Tag } from "../models/tag";

export default class TagStore {
    tag: Tag | null = null;
    tags: Tag[] | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadTag = async (tagId: string) => {
        this.loading = true;
        try {
            const tag = await agent.Tags.getTagById(tagId);

            runInAction(() => {
                this.tag = tag;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}