import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import PostStore from "./postStore";
import ProfileStore from "./profileStore";
import TagStore from "./tagStore";
import UserStore from "./userStore";

interface Store {
    profileStore: ProfileStore;
    postStore: PostStore;
    tagStore : TagStore;
    userStore: UserStore;
    commentStore : CommentStore;
}

export const store: Store = {
    profileStore: new ProfileStore(),
    postStore: new PostStore(),
    tagStore: new TagStore(),
    userStore: new UserStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}