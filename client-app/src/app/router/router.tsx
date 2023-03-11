import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import FollowList from "../../features/followers/FollowList";
import HomePage from "../../features/home/HomePage";
import PostPage from "../../features/posts/PostPage";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: "profile/:username", element: <ProfilePage /> },
                    { path: "post/:postId", element: <PostPage /> },
                    { path: ":username/followers", element: <FollowList predicate="followers" /> },
                    { path: ":username/followings", element: <FollowList predicate="followings" /> },
                    { path: "home", element: <HomePage /> }
                ]
            },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
        ]
    }
];

export const router = createBrowserRouter(routes);