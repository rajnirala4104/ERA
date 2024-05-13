import React, { Fragment, Suspense, useContext, useEffect, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner';
import { PlusIcon } from '../icons';
import { PostCreatePopupContext } from '../contaxt';
import { getAllThePostOfAPerticulerUser } from '../api/services/postApiServices';
import { postInterface } from '../interfaces';

const UserProfilePostContainer: React.FC = () => {
    const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(PostCreatePopupContext)
    const [allPosts, setAllPosts] = useState<postInterface[]>()

    const gettingAllThePosts = async () => {
        const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);
        const { data } = await getAllThePostOfAPerticulerUser(loggedUser._id, loggedUser.token)
        setAllPosts(data.data)
    }

    useEffect(() => {
        gettingAllThePosts()
    }, [])

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='relative border border-red-500 w-full h-full'>
                    <span>DIKSHA'S POST</span>
                    <div
                        onClick={() => setPostCreatePopupOnOff(!postCreatePopupOnOff)}
                        className='appPostBtn absolute bottom-[6%] right-[4%] cursor-pointer'>
                        <PlusIcon classess='text-4xl hover:text-slate-800' />
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default UserProfilePostContainer;
