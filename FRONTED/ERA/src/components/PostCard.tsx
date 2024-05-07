import React, { Fragment, Suspense, memo } from 'react'
import { postInterface } from '../interfaces'
import { LoaderSpinner } from './LoaderSpinner'
import { PostIcons } from '.'
import { getDateFromMongoData } from '../utils'

const PostCard: React.FC<postInterface> = memo((props) => {

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className="postCard mx-3 my-6  flex flex-col justify-center items-center rounded-lg shadow-lg bg-white">
                    <div className="userInfo w-[95%] my-2 flex justify-between items-center ">
                        <div className='flex justify-center items-center'>
                            <img className='w-[2rem] rounded-full' src={props.user?.profilePic} alt="" />
                            <span className='mx-2 font-bold'>{props.user?.name}</span>
                        </div>
                        <div>
                            <span>{getDateFromMongoData(props.createdAt as string)}</span>
                        </div>
                    </div>
                    <div className="content w-[95%]">
                        {/* ------------------------- thought Post Idia ------------ */}
                        {props.caption ? (
                            <img className='w-full rounded-md' src={props.content} alt={"ERA post"} />
                        ) : (
                            <span className='font-mono font-semibold'>"{props.thought}"</span>
                        )}
                    </div>
                    <div className="caption w-[90%] mt-2 font-semibold ">
                        <p>{props.caption}</p>
                    </div>
                    <div className='w-[95%]'>
                        <PostIcons />
                    </div>
                </div>
            </Suspense>
        </Fragment>
    )
})

export default PostCard