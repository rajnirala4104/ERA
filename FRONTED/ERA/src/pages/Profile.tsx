import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { user } from '../interfaces';
import { NotFoundPage } from './NotFoundPage';

export const Profile: React.FC = () => {
    const { userId } = useParams()
    const navigator = useNavigate()

    const [user, setUser] = useState<user[]>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser([user]);
    }, []);

    if (user[0]._id !== userId) { <NotFoundPage /> }

    return (
        <Fragment>
            <div className="container">
                {user?.map(singleUserObject => {
                    return (
                        <Fragment>

                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
}
