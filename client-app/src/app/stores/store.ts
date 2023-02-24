import { createContext, useContext } from "react";
import PostStore from "./postStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    profileStore: ProfileStore;
    postStore: PostStore;
    userStore: UserStore;
}

export const store: Store = {
    profileStore: new ProfileStore(),
    postStore: new PostStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}