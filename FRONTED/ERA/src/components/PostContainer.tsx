import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { PostCard } from './PostCard'
import { getAllThePosts } from '../api/services/postApiServices'
import { postInterface } from '../interfaces'
import { getAllThoughtPost } from '../api/services/thoughtPostServices'

export const PostContainer: React.FC = () => {
    const [allPost, setAllPost] = useState<postInterface[]>([])

    const getAllThePost = async () => {
        const data = JSON.parse(localStorage.getItem('userInfo') as string)
        const postResponse = await getAllThePosts(data.token)
        const thougthPostResponse = await getAllThoughtPost(data.token)
        const newArrayOfMixPosts = postResponse.data.data.concat(thougthPostResponse.data.data)
        setAllPost(newArrayOfMixPosts)

    }

    console.log(allPost)
    useEffect(() => {
        getAllThePost()
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className=' w-[90%] mx-auto'>
                    {allPost.map((singplePostObject, index) => (
                        <Fragment key={index}>
                            <PostCard {...singplePostObject} />
                        </Fragment>
                    ))}
                </div>
            </Suspense>
        </Fragment>
    )
}
