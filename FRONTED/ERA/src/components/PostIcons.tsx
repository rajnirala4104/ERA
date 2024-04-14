import React, { Fragment } from 'react'
import { CommentIcon, LikeIcon, UnLikeIcon } from '../icons'

export const PostIcons: React.FC = () => {
    return (
        <Fragment>
            <div className="iconsContainer border border-red-500">
                <UnLikeIcon />
                <CommentIcon />
            </div>
        </Fragment>
    )
}
