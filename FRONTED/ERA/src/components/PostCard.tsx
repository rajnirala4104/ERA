import React from 'react'
import { postInterface } from '../interfaces'

export const PostCard: React.FC<postInterface> = (props) => {
    console.log(props)
    return (
        <div>{props.caption}</div>
    )
}
