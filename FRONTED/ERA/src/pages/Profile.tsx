import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { user } from '../interfaces';
import { NotFoundPage } from './NotFoundPage';
import { LoaderSpinner, UserProfileHeader, UserProfilePostContainer } from '../components';

export const Profile: React.FC = () => {
    const { userId } = useParams()
    const navigator = useNavigate()

    const [user, setUser] = useState<user[]>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        if (user._id !== userId) {
            navigator('/notfounderror/asdf')
        }
        setUser([user]);
    }, []);


    return (
        <Fragment>
            <div className="container">
                {user?.map((singleUserObject, index) => {
                    return (
                        <Fragment key={index}>
                            <Suspense fallback={<LoaderSpinner />}>
                                <div>
                                    <UserProfileHeader {...singleUserObject} />
                                </div>
                                <div>
                                    <UserProfilePostContainer />
                                </div>
                            </Suspense>
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
}
