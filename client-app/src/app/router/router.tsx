import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
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
                    { path: "home", element: <HomePage /> }
                ]
            }
        ]
    }
];

export const router = createBrowserRouter(routes);