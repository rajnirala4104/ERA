import React, { ReactNode } from "react";

export interface user {
    _id: string,
    name: string,
    profilePic: string,
    bio: string,
    email: string,
    token: string
}

export interface loginDesinContext {
    loginDesign: boolean,
    setLoginDesign: React.Dispatch<React.SetStateAction<boolean>>
}

export interface profilePopupOnOffContextInterface {
    profilePopupOnOff: boolean,
    setProfilePopupOnOff: React.Dispatch<React.SetStateAction<boolean>>
}
export interface editPostPopupContextInterface {
    editPostPopupOnOff: boolean,
    setEditPostPopupOnOff: React.Dispatch<React.SetStateAction<boolean>>
}

export interface postCreatePopupContextInterface {
    postCreatePopupOnOff: boolean,
    setPostCreatePopupOnOff: React.Dispatch<React.SetStateAction<boolean>>
}

export interface stateProviderContext {
    _user?: user | null,
    set_user: React.Dispatch<React.SetStateAction<user | undefined>>
}

export interface stateProviderProp {
    children: ReactNode
}


export interface postInterface {
    caption?: string,
    content?: string,
    user?: user,
    createdAt?: string,
    updateAt?: string,
    thought?: string,
}

export interface menuInterface {
    icon: React.ReactNode,
    menuName: string,
    path: string
}

