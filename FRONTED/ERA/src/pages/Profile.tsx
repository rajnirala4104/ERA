import React, { Fragment, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { user } from '../interfaces';
import { LeftSideBar, LoaderSpinner, PostCreatePopupForm, ProfilePopup, UserProfileHeader, UserProfilePostContainer } from '../components';
import { getSingleUserInformation } from '../api/services/usersServices';
import { PostCreatePopupContext, ProfilePopupContext } from '../contaxt';


const Profile: React.FC = () => {
    const { userId } = useParams()
    const navigator = useNavigate();

    const [user, setUser] = useState<user[]>();

    const getUserInformation = async () => {
        const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);
        const userResponse = await getSingleUserInformation(loggedUser.token, userId as string)
        setUser(userResponse.data.data)
    }

    useEffect(() => {
        getUserInformation()
    }, []);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        if (!user) navigator("/account");
    }, []);

    const { profilePopupOnOff } = useContext(ProfilePopupContext)
    const { postCreatePopupOnOff } = useContext(PostCreatePopupContext)

    return (
        <Fragment>
            <div className="flex flex-col">

                {profilePopupOnOff ? <ProfilePopup {...user![0]} /> : ""}
                {postCreatePopupOnOff ? <PostCreatePopupForm /> : ""}
                {/* ------------------  */}
                {user?.map((singleUserObject, index) => {
                    return (
                        <Fragment key={index}>
                            <Suspense fallback={<LoaderSpinner />}>
                                <div >
                                    <UserProfileHeader {...singleUserObject} />
                                </div>
                                <div className='flex  w-full h-[74vh] justify-between '>
                                    <div className='lg:flex md:flex hidden w-[28%]'>
                                        <LeftSideBar />
                                    </div>
                                    <div className=' border border-red-500 w-[72%]'>
                                        <UserProfilePostContainer />
                                    </div>
                                </div>
                            </Suspense>
                        </Fragment>
                    )
                })}

            </div>
        </Fragment>
    )
}

export default Profile
