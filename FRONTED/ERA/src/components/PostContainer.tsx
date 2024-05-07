import React, { Fragment, Suspense, lazy, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
const PostCard = lazy(() => import('./PostCard'))

import { getAllThePosts } from '../api/services/postApiServices'
import { postInterface } from '../interfaces'
import { getAllThoughtPost } from '../api/services/thoughtPostServices'
import { shuffleArray } from '../utils'
import '../css/postContainer.css'

const PostContainer: React.FC = () => {
    const [allPost, setAllPost] = useState<postInterface[]>([])

    const getAllThePost = async () => {
        const data = JSON.parse(localStorage.getItem('userInfo') as string)
        const postResponse = await getAllThePosts(data.token)
        const thougthPostResponse = await getAllThoughtPost(data.token)
        const newArrayOfMixPosts = postResponse.data.data.concat(thougthPostResponse.data.data)
        setAllPost(shuffleArray(newArrayOfMixPosts))
    }

    useEffect(() => {
        getAllThePost()
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className=' w-[90%] mx-auto h-[89vh] overflow-y-auto'>
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

export default PostContainer;