import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignupAndLogin } from '.';

export const Home: React.FC = () => {

    const navigator = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo') as string);

        if (user) {
            navigator('/')
        }
    }, [])

    return (
        <React.Fragment>
            <SignupAndLogin />
        </React.Fragment>
    )
}
