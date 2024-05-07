import React, { Fragment } from 'react'
import { CommentIcon, LikeIcon, UnLikeIcon } from '../icons'

const PostIcons: React.FC = () => {
    return (
        <Fragment>
            <div className="iconsContainer flex w-[50%] my-4 justify-between ">
                <div className='flex justify-center items-center hover:bg-green-200 rounded-md cursor-pointer px-2 py-1'>
                    <UnLikeIcon classess='mx-1 text-2xl' />
                    <span>Like</span>
                </div>
                <span className='text-gray-600'>|</span>
                <div className='flex justify-center items-center  hover:bg-green-200  rounded-md cursor-pointer  px-2 py-1'>
                    <CommentIcon classess='mx-1 text-2xl' />
                    <span>Comment</span>
                </div>
            </div>
        </Fragment>
    )
}

export default PostIcons;
