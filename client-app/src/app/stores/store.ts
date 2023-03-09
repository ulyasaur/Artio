import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import PostStore from "./postStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    profileStore: ProfileStore;
    postStore: PostStore;
    userStore: UserStore;
    commentStore : CommentStore;
}

export const store: Store = {
    profileStore: new ProfileStore(),
    postStore: new PostStore(),
    userStore: new UserStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}