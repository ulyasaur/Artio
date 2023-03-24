import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Auth } from "../models/auth";
import AuthResponse from "../models/authResponse";
import { Photo } from "../models/photo";
import { Post, PostFormValues } from "../models/post";
import { Profile } from "../models/profile";
import { Tag } from "../models/tag";
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
    toggleFollow: (targetId: string) => requests.put(`/user/${targetId}`, targetId),
    getFollowers: (targetId: string) => requests.get<User[]>(`/user/${targetId}/followers`),
    getFollowings: (observerId: string) => requests.get<User[]>(`/user/${observerId}/followings`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/user`, profile),
    uploadProfilePicture: (file: Blob) => {
        let formData = new FormData();
        formData.append("File", file);
        return axios.post<Photo>("/user/profilePicture", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    uploadProfileBackground: (file: Blob) => {
        let formData = new FormData();
        formData.append("File", file);
        return axios.post<Photo>("/user/profileBackground", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    addTag: (tagId: number) => requests.post(`/user/tag/${tagId}`, tagId),
    deleteTag: (tagId: number) => requests.del(`/user/tag/${tagId}`)
}

const Posts = {
    getUserPosts: (id: string) => requests.get<Post[]>(`/post/${id}`),
    getPost: (postId: string) => requests.get<Post>(`/post/post/${postId}`),
    getPostsByFollowings: () => requests.get<Post[]>(`/post/followings`),
    getPostsByUserTags: () => requests.get<Post[]>(`/post/tags`),
    getPostsByTag: (tagId: string) => requests.get<Post[]>(`/post/tags/${tagId}`),
    toggleLike: (postId: string) => requests.post(`/post/like/${postId}`, postId),
    addPost: (post: PostFormValues) => {
        let formData = new FormData();
        formData.append("Description", post.description);
        formData.append("Tags", JSON.stringify(post.tags));
        formData.append("Image", post.image!);
        return axios.post<Post>("/post", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    updatePost: (post: PostFormValues) => requests.put(`/post/${post.postId}`, post),
    deletePost: (postId: number) => requests.del(`/post/${postId}`)
}

const Tags = {
    getUserTags: (userId:string) => requests.get<Tag[]>(`/tag/followed/${userId}`),
    getTagById: (tagId: string) => requests.get<Tag>(`/tag/${tagId}`)
}

const agent = {
    Account,
    Profiles,
    Posts,
    Tags
};

export default agent;