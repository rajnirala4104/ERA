import React, { useEffect, useState } from 'react'
import { SignupAndLogin } from '.';
import { Main } from '../components';

export const Home: React.FC = () => {

    const [userExist, setUserExist] = useState<boolean>(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo') as string);

        if (user) {
            setUserExist(!userExist)
            console.log(user)
        }
    }, [])

    return (
        <React.Fragment>
            {userExist ? <Main /> : <SignupAndLogin />}
        </React.Fragment>
    )
}
