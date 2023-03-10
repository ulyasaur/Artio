import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Auth } from "../models/auth";
import AuthResponse from "../models/authResponse";
import { Post } from "../models/post";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { router } from "../router/router";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:7157/api";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.interceptors.request.use(config => {
    const token = store.userStore.token;

    if (token && config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);

    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                router.navigate("/not-found");
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised');
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate("/not-found")
            break;
        case 500:
            toast.error("Server error");
            break;
    }

    return Promise.reject(error);
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
    get: (username: string) => requests.get<Profile>(`/user/${username}`),
    toggleFollow: (targetId : string) => requests.put(`/user/${targetId}`, targetId),
    getFollowers: (targetId : string) => requests.get<User[]>(`/user/${targetId}/followers`),
    getFollowings: (observerId : string) => requests.get<User[]>(`/user/${observerId}/followings`)
}

const Posts = {
    getUserPosts: (id: string) => requests.get<Post[]>(`/post/${id}`),
    getPost: (postId: string) => requests.get<Post>(`/post/post/${postId}`),
    toggleLike: (postId: string) => requests.post(`/post/like/${postId}`, postId)
}

const agent = {
    Account,
    Profiles,
    Posts
};

export default agent;