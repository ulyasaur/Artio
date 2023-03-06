import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { Auth } from "../models/auth";
import AuthResponse from "../models/authResponse";
import { Post } from "../models/post";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:7157/api";

axios.interceptors.request.use(config => {
    const token = store.userStore.token;

    if (token && config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
    login: (user: Auth) => requests.post<AuthResponse>("/account/login", user),
    register: (user: Auth) => requests.post("/account/register", user),
    current: () => requests.get<User>("/account/current")
}

const Profiles = {
    get: (username : string) => requests.get<Profile>(`/user/${username}`)
}

const Posts = {
    getUserPosts: (id: string) => requests.get<Post[]>(`/post/${id}`)
}

const agent = {
    Account,
    Profiles,
    Posts
};

export default agent;