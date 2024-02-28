import { ReactNode } from "react";

export interface context {
    loginDesign: boolean,
    setLoginDesign: React.Dispatch<React.SetStateAction<boolean>>
}

export interface stateProviderContext {
    _user?: user,
    set_user: React.Dispatch<React.SetStateAction<user | undefined>>
}

export interface stateProviderProp {
    children: ReactNode
}

export interface user {
    _id: string,
    name: string,
    email: string,
    token: string
}