import React, { Fragment, Suspense, useContext } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { CloseIcon } from '../icons'
import { FollowersPopupContext } from '../contaxt'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../redux/store";
import { resetFollowState } from '../redux/states/usersFollowersAndFollowings'

const FollowersPopup: React.FC = () => {

    const { followerPopupOnOff, setFollowersPopupOnOff } = useContext(FollowersPopupContext);
    const dispatch = useDispatch()
    const { followersAndFollowings } = useSelector((state: RootState) => state);
    // const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section
                    style={{
                        background: `rgba(65, 65, 65, 0.35)`,
                    }}
                    className="w-full h-screen flex justify-center items-center backdrop-blur-sm absolute top-0 left-0 bg-black z-10"
                >
                    <div className="centerContainer flex w-[70%] h-[90%] justify-center relative items-center bg-white rounded-md">
                        <span
                            onClick={() => {
                                setFollowersPopupOnOff(!followerPopupOnOff)
                                dispatch(resetFollowState())
                            }}
                            className="absolute text-2xl top-[3%] right-[2%] cursor-pointer"
                        >
                            {<CloseIcon classess="" />}
                        </span>
                        <div className='flex justify-between w-[90%] p-2 h-[80%] items-center border border-red-500'>
                            {followersAndFollowings.map((singleObject, index) => (
                                <Fragment key={index}>
                                    <div className='followers border border-blue-500 w-full h-full mx-2'>
                                        <div className="title grid place-content-center">
                                            <span className='text-2xl font-bold text-center'>Followers</span>
                                        </div>
                                        <span>{singleObject.user.name}</span>
                                    </div>
                                    <div className='followings border border-blue-500 w-full h-full mx-2'>
                                        <div className="title grid place-content-center">
                                            <span className='text-2xl font-bold text-center'>Followings</span>
                                        </div>
                                        <span>{singleObject.followedUserId.name}</span>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default FollowersPopup