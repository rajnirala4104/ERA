import { createContext } from "react";
import {
    editPostPopupContextInterface,
    loginDesinContext,
    profilePopupOnOffContextInterface
} from "../interfaces";


export const LoginDesignContext = createContext<loginDesinContext>({
    loginDesign: true,
    setLoginDesign: () => false
});

export const ProfilePopupContext = createContext<profilePopupOnOffContextInterface>({
    profilePopupOnOff: false,
    setProfilePopupOnOff: () => false
})

export const EditPostPopupContext = createContext<editPostPopupContextInterface>({
    editPostPopupOnOff: false,
    setEditPostPopupOnOff: () => false
})