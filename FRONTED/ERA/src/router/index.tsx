import { createBrowserRouter } from "react-router-dom";
import { Home, Profile, Root } from "../pages";

export const _ROUTER = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/:userName',
            element: <Profile />
        },
    ]
}])