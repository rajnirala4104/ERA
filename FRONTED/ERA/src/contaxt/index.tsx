import { createContext } from "react";
import {
   editPostPopupContextInterface,
   loginDesinContext,
   postCreatePopupContextInterface,
   profilePopupOnOffContextInterface,
   singlePostPopupContextInterface,
} from "../interfaces";

export const LoginDesignContext = createContext<loginDesinContext>({
   loginDesign: true,
   setLoginDesign: () => false,
});

export const ProfilePopupContext =
   createContext<profilePopupOnOffContextInterface>({
      profilePopupOnOff: false,
      setProfilePopupOnOff: () => false,
   });

export const EditPostPopupContext =
   createContext<editPostPopupContextInterface>({
      editPostPopupOnOff: false,
      setEditPostPopupOnOff: () => false,
   });

export const PostCreatePopupContext =
   createContext<postCreatePopupContextInterface>({
      postCreatePopupOnOff: false,
      setPostCreatePopupOnOff: () => false,
   });

export const SinglePostPopupContext =
   createContext<singlePostPopupContextInterface>({
      singlePostPopupOnOff: false,
      setSinglePostPopupOnOff: () => false,
   });
