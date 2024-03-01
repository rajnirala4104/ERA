import { createBrowserRouter } from "react-router-dom";
import { Home, Profile, Root } from "../pages";
import { Main } from "../components";

export const _ROUTER = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/account',
            element: <Home />
        },
        {
            path: '/',
            element: <Main />
        },
        {
            path: '/:userName',
            element: <Profile />
        },
    ]
}])