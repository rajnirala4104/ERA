import React, { Fragment } from 'react'
import { user } from '../interfaces'

const UserSingleCard: React.FC<user> = (props) => {
    return (
        <Fragment>
            <div>
                <span>{props.name}</span>
            </div>
        </Fragment>
    )
}

export default UserSingleCard