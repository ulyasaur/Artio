
import axios, { AxiosResponse } from "axios";
import { Post } from "../models/post";
import { Profile } from "../models/profile";

axios.defaults.baseURL = "https://localhost:7157/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Profiles = {
    get: (username : string) => requests.get<Profile>(`/user/${username}`)
}

const Posts = {
    getUserPosts: (id: string) => requests.get<Post[]>(`/post/${id}`)
}

const agent = {
    Profiles,
    Posts
};

export default agent;