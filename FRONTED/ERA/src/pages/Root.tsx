import React, { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ProfilePopup } from '../components';
import { ProfilePopupContext } from '../contaxt';
const Root: React.FC = () => {
    const { profilePopupOnOff } = useContext(ProfilePopupContext)
    return (
        <Fragment>
            {profilePopupOnOff ? <ProfilePopup /> : ""}
            <Outlet />
        </Fragment>
    )
}

export default Root;
