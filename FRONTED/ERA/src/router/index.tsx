import { createBrowserRouter } from "react-router-dom";
import { Home, Profile, Root } from "../pages";
import { SignupAndLogin } from "../components";

export const _ROUTER = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/account',
            element: <SignupAndLogin />
        },
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