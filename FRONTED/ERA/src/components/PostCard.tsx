import React, { Fragment, Suspense } from 'react'
import { postInterface } from '../interfaces'
import { LoaderSpinner } from './LoaderSpinner'
import { PostIcons } from './PostIcons'

export const PostCard: React.FC<postInterface> = (props) => {
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className="postCard mx-3 py-6 my-6  flex flex-col justify-center items-center rounded-md shadow-lg bg-white">
                    <div className="userInfo">
                        <span>{props.user.name}</span>
                    </div>
                    <div className="content w-[90%]">
                        <img className='w-full' src={props.content} alt="ERA post" />
                    </div>
                    <div className="caption w-[90%]">
                        <p>{props.caption}</p>
                    </div>
                    <div>
                        <PostIcons />
                    </div>
                </div>
            </Suspense>
        </Fragment>
    )
}
