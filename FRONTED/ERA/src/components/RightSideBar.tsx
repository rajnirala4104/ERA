import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner';
import { getAllTheUser } from '../api/services/authenticationApiServices';
import { user } from '../interfaces';
import UserSingleCard from './UserSingleCard';
import { shuffleArray } from '../utils';

const RightSideBar: React.FC = () => {

    const [user, setUser] = useState<user>()
    const [suggestedUser, setSuggestedUser] = useState<user[]>()

    const gettingAllTherUser = async () => {
        const response = await getAllTheUser(user?.token!)
        setSuggestedUser(shuffleArray(response.data.data))
    }

    useEffect(() => {
        gettingAllTherUser()
    }, [user])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser(user)
    }, []);

    console.log(suggestedUser)
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='bg-[#0edaa3] w-full flex-col flex justify-start items-center h-[89vh]'>
                    <div className="rightSideBarTitle flex justify-center items-center">
                        <span className='text-xl font-semibold my-3'>Suggestions</span>
                    </div>
                    <div className="userSingleCardContainer flex flex-col w-[90%] overflow-y-auto h-[90%] px-2">
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
