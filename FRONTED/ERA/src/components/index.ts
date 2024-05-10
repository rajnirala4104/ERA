import { lazy } from 'react'

export * from './LoaderSpinner'
export const PostContainer = lazy(() => import('./PostContainer'))
export const ForgotPasswordForm = lazy(() => import('./ForgotPasswordForm'))
export const Login = lazy(() => import('./Login'));
export const SignupAndLogin = lazy(() => import('./SignupAndLogin'))
export const Singup = lazy(() => import('./Singup'))
export const Navbar = lazy(() => import('./Navbar'));
export const LeftSideBar = lazy(() => import('./LeftSideBar'))
export const RightSideBar = lazy(() => import('./RightSideBar'))
export const PostIcons = lazy(() => import('./PostIcons'));
export const UserProfileHeader = lazy(() => import('./UserProfileHeader'));
export const PostCard = lazy(() => import('./PostCard'));
export const UserProfilePostContainer = lazy(() => import('./UserProfilePostContainer'));
export const SingleLeftSideBarMenu = lazy(() => import('./SingleLeftSideBarMenu'));
export const SearchNavbarBtn = lazy(() => import('./SearchNavbarBtn'))
export const StoriesIcon = lazy(() => import('./StoriesIcon'))
export const ProfilePopup = lazy(() => import('./ProfilePopup'))