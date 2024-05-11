import React, { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { EditPostPopupContext } from '../contaxt'
import { EditPostPopup } from '../components'
const Root: React.FC = () => {

    const { editPostPopupOnOff, setEditPostPopupOnOff } = useContext(EditPostPopupContext)

    console.log(editPostPopupOnOff)
    return (
        <Fragment>
            {editPostPopupOnOff ? <EditPostPopup /> : ""}
            <Outlet />
        </Fragment>
    )
}

export default Root;
