import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

export const Root: React.FC = () => {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
