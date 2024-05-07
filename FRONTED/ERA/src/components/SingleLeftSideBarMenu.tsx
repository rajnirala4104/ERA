import React, { Fragment } from 'react'
import { menuInterface } from '../interfaces'

const SingleLeftSideBarMenu: React.FC<menuInterface> = (props) => {
    return (
        <Fragment>
            <div className="sinpleMen cursor-pointer hover:bg-slate-700 flex justify-start items-center bg-slate-800 m-2 h-10 rounded-md">
                <div className='icon'>
                    {props.icon}
                </div>
                <div className="menuName mx-2 ">
                    <span>{props.menuName}</span>
                </div>
            </div>
        </Fragment>
    )
}

export default SingleLeftSideBarMenu;
