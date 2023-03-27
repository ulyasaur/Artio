import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Tag } from "../models/tag";

export default class TagStore {
    tag: Tag | null = null;
    tags: Tag[] | null = null;
    searchedTags: Tag[] | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getTagByTagName = (tagName: string) => {
        return this.tags?.find(t => t.tagName === tagName);
    }

    loadTags = async () => {
        this.loading = true;
        try {
            const tags = await agent.Tags.getAllTags();

            runInAction(() => {
                this.tags = tags;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadSearchedTags = async (search: string) => {
        this.loading = true;
        try {
            const tags = await agent.Tags.getSearchedTags(search);

            runInAction(() => {
                this.searchedTags = tags;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
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

    addTag = async (tagName: string) => {
        this.loading = true;
        try {
            const tag = await agent.Tags.addTag(tagName);

            runInAction(() => {
                this.tags?.push(tag);
                this.loading = false;
            });

            return tag;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
            return null;
        }
    }
}