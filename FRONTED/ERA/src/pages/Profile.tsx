import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

export const Profile = () => {
    const { userName } = useParams()
    return (
        <Fragment>
            <div className="container">
                <h1>{userName}</h1>
            </div>
        </Fragment>
    )
}
