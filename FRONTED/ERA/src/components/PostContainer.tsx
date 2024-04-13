import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { PostCard } from './PostCard'
import { getAllThePosts } from '../api/services/postApiServices'
import { postInterface } from '../interfaces'

export const PostContainer: React.FC = () => {
    const [allPost, setAllPost] = useState<postInterface[]>([])

    const getAllThePost = async () => {

        const data = JSON.parse(localStorage.getItem('userInfo') as string)
        const response = await getAllThePosts(data.token)
        console.log(response.data.data)
        setAllPost(response.data.data)
    }

    useEffect(() => {
        getAllThePost()
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>
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
