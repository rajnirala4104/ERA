import { createContext } from "react";
import { context } from "../interfaces";
export const LoginDesignContext = createContext<context>({ loginDesign: true });