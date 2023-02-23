import { createBrowserRouter, RouteObject } from "react-router-dom";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: "profile/:username", element: <ProfilePage/>}
        ]
    }
];

export const router = createBrowserRouter(routes);