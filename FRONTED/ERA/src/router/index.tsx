import { createBrowserRouter } from "react-router-dom";
import { Home, Profile, Root, SignupAndLogin } from "../pages";

export const _ROUTER = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/',
            element: <SignupAndLogin />
        },
        {
            path: '/:userName',
            element: <Profile />
        },
    ]
}])