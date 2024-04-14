import React, { Fragment, Suspense } from 'react'
import { postInterface } from '../interfaces'
import { LoaderSpinner } from './LoaderSpinner'
import { PostIcons } from './PostIcons'
import { getDateFromMongoData } from '../utils'

export const PostCard: React.FC<postInterface> = (props) => {
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className="postCard mx-3 my-6  flex flex-col justify-center items-center rounded-lg shadow-lg bg-white">
                    <div className="userInfo w-[95%] my-2 flex justify-between items-center ">
                        <div className='flex justify-center items-center'>
                            <img className='w-[2rem] rounded-full' src={props.user.profilePic} alt="" />
                            <span className='mx-2 font-bold'>{props.user.name}</span>
                        </div>
                        <div>
                            <span>{getDateFromMongoData(props.createdAt)}</span>
                        </div>
                    </div>
                    <div className="content w-[95%]">
                        <img className='w-full rounded-md' src={props.content} alt="ERA post" />
                    </div>
                    <div className="caption w-[95%]">
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
