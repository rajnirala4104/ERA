import React, { Fragment, Suspense } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { SingleLeftSideBarMenu } from '.'
import { ChatIcon, HomeIcon, UserProfileIcon } from '../icons'
import { menuInterface } from '../interfaces'

const LeftSideBar: React.FC = () => {

    const menusDataObjectsArray: menuInterface[] = [{
        icon: <HomeIcon classess='text-xl ml-3' />,
        menuName: "Home"
    },
    {
        icon: <ChatIcon classess='text-xl ml-3' />,
        menuName: "Chat"
    },
    {
        icon: <UserProfileIcon classess='text-xl ml-3' />,
        menuName: "Profile"
    }
    ]

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='shadow-lg w-full bg-gray-900 text-white'>
                    <div className="menuContainer">
                        {menusDataObjectsArray.map(singleObject => <SingleLeftSideBarMenu {...singleObject} />)}
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default LeftSideBar;
