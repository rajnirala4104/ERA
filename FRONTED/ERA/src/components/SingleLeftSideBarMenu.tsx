import React, { Fragment } from 'react'
import { HomeIcon } from '../icons'

export const SingleLeftSideBarMenu: React.FC = () => {
    return (
        <Fragment>
            <div className="sinpleMen cursor-pointer hover:bg-slate-700 flex justify-start items-center bg-slate-800 m-2 h-10 rounded-md">
                <div className='icon'>
                    <HomeIcon classess="text-2xl mx-2" />
                </div>
                <div className="menuName mx-2 ">
                    <span>Home</span>
                </div>
            </div>
        </Fragment>
    )
}
