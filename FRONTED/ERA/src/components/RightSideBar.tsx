import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner';
import { getAllTheUser } from '../api/services/authenticationApiServices';
import { user } from '../interfaces';
import UserSingleCard from './UserSingleCard';

const RightSideBar: React.FC = () => {

    const [user, setUser] = useState<user>()
    const [suggestedUser, setSuggestedUser] = useState<user[]>()

    const gettingAllTherUser = async () => {
        const response = await getAllTheUser(user?.token!)
        setSuggestedUser(response.data.data)
    }

    useEffect(() => {
        gettingAllTherUser()
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser(user)
    }, []);

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='bg-[#6fc9b3] w-full flex-col flex justify-start items-center'>
                    <div className="rightSideBarTitle flex justify-center items-center">
                        <span className='text-xl font-semibold my-3'>Suggestions</span>
                    </div>
                    <div className="userSingleCardContainer flex flex-col border border-black">
                        {suggestedUser?.map((singleObject, index) =>
                            <Fragment key={index}>
                                <UserSingleCard {...singleObject} />
                            </Fragment>
                        )}
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default RightSideBar; 
