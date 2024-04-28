import { createBrowserRouter } from "react-router-dom";
import { SignupAndLogin } from "../components";
import { ForgotPassword, Home, NotFoundPage, Profile, Root } from "../pages";

export const _ROUTER = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      children: [
         {
            path: "/account",
            element: <SignupAndLogin />,
         },
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/password",
            element: <ForgotPassword />,
         },
         {
            path: "/user-profile/:userId",
            element: <Profile />,
         },
         {
            path: "/notfounderror/*",
            element: <NotFoundPage />
         }
      ],
   },
]);
