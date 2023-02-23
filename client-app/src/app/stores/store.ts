import { createContext, useContext } from "react";
import PostStore from "./postStore";
import ProfileStore from "./profileStore";

interface Store {
    profileStore: ProfileStore;
    postStore: PostStore;
}

export const store: Store = {
    profileStore: new ProfileStore(),
    postStore: new PostStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}