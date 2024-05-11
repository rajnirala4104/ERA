import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { SingleLeftSideBarMenu } from '.'
import { ChatIcon, HomeIcon, UserProfileIcon } from '../icons'
import { menuInterface, user } from '../interfaces'

const LeftSideBar: React.FC = () => {

    const [user, setUser] = useState<user>()

    const menusDataObjectsArray: menuInterface[] = [{
        icon: <HomeIcon classess='text-xl ml-3' />,
        menuName: "Home",
        path: '/'
    },
    {
        icon: <ChatIcon classess='text-xl ml-3' />,
        menuName: "Chat",
        path: '/chat'
    },
    {
        icon: <UserProfileIcon classess='text-xl ml-3' />,
        menuName: "Profile",
        path: `/user-profile/${user?._id}`
    }
    ]

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser(user)
    }, []);

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='shadow-lg w-full bg-gray-900 text-white'>
                    <div className="menuContainer">
                        {menusDataObjectsArray.map((singleObject, index) => (
                            <Fragment key={index}>
                                <SingleLeftSideBarMenu {...singleObject} />
                            </Fragment>
                        ))}
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default LeftSideBar;
