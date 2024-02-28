import { createContext } from "react";
import { loginDesinContext } from "../interfaces";
export const LoginDesignContext = createContext<loginDesinContext>({
    loginDesign: true,
    setLoginDesign: () => false
});