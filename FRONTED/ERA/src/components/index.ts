import { lazy } from 'react'

export * from './LoaderSpinner'
export const UserProfilePostContainer = lazy(() => import('./UserProfilePostContainer'));
export const SingleLeftSideBarMenu = lazy(() => import('./SingleLeftSideBarMenu'));
export const ForgotPasswordForm = lazy(() => import('./ForgotPasswordForm'));
export const UserProfileHeader = lazy(() => import('./UserProfileHeader'));
export const SearchNavbarBtn = lazy(() => import('./SearchNavbarBtn'));
export const SignupAndLogin = lazy(() => import('./SignupAndLogin'));
export const PostContainer = lazy(() => import('./PostContainer'));
export const EditPostPopup = lazy(() => import('./EditPostPopup'));
export const ProfilePopup = lazy(() => import('./ProfilePopup'));
export const RightSideBar = lazy(() => import('./RightSideBar'));
export const StoriesIcon = lazy(() => import('./StoriesIcon'));
export const LeftSideBar = lazy(() => import('./LeftSideBar'));
export const PostIcons = lazy(() => import('./PostIcons'));
export const PostCard = lazy(() => import('./PostCard'));
export const Singup = lazy(() => import('./Singup'));
export const Navbar = lazy(() => import('./Navbar'));
export const Login = lazy(() => import('./Login'));
