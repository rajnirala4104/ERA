import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { user } from '../interfaces';
import { LeftSideBar, LoaderSpinner, UserProfileHeader, UserProfilePostContainer } from '../components';
import { getSingleUserInformation } from '../api/services/usersServices';

export const Profile: React.FC = () => {
    const { userId } = useParams()
    const navigator = useNavigate()

    const [user, setUser] = useState<user[]>();

    const getUserInformation = async () => {
        const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);
        const userResponse = await getSingleUserInformation(loggedUser.token, userId as string)
        setUser(userResponse.data.data)
        console.log(userResponse.data.data)
    }


    useEffect(() => {
        getUserInformation()
    }, []);


    return (
        <Fragment>
            <div className="flex flex-col">
                {user?.map((singleUserObject, index) => {
                    return (
                        <Fragment key={index}>
                            <Suspense fallback={<LoaderSpinner />}>
                                <div >
                                    <UserProfileHeader {...singleUserObject} />
                                </div>
                                <div className='flex '>
                                    <div className='lg:flex md:flex hidden'>

                                        <LeftSideBar />
                                    </div>
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
