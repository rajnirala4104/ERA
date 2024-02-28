import React, { createContext, useContext, useState } from 'react'
import { stateProviderContext, stateProviderProp, user } from '../interfaces'

const stateContext = createContext<stateProviderContext>({ _user: null, set_user: () => { } })

export const StateProvider: React.FC<stateProviderProp> = ({ children }) => {

    const [_user, set_user] = useState<user>()

    return (
        <stateContext.Provider value={{ _user, set_user }}>
            {children}
        </stateContext.Provider>
    )
}

export const AllState = () => {
    return useContext(stateContext)
}
