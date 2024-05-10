import { createContext } from "react";
import { loginDesinContext, profilePopupOnOffContextInterface } from "../interfaces";
export const LoginDesignContext = createContext<loginDesinContext>({
    loginDesign: true,
    setLoginDesign: () => false
});

export const ProfilePopupContext = createContext<profilePopupOnOffContextInterface>({
    profilePopupOnOff: false,
    setProfilePopupOnOff: () => false
})