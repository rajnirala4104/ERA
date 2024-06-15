import React, { Fragment, Suspense, useContext } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { CloseIcon } from '../icons'
import { FollowersPopupContext } from '../contaxt'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../redux/store";
import { resetFollowState } from '../redux/states/usersFollowersAndFollowings'
import { useParams } from 'react-router-dom'

// This is a functional component for the FollowersPopup. It displays the list of followers or followings
// of the user who is currently logged in. It also has a close button to close the popup.
const FollowersPopup: React.FC = () => {

    // UseContext hook to access the state and setter function from the FollowersPopupContext
    const { followerPopupOnOff, setFollowersPopupOnOff } = useContext(FollowersPopupContext);

    // UseDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch()

    // UseSelector hook to access the state from the Redux store
    const { followersAndFollowings } = useSelector((state: RootState) => state);

    // UseParams hook to access the userId from the URL parameters
    const { userId } = useParams()

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                {/* Section to display the popup */}
                <section
                    style={
                        {
                            background: `rgba(65, 65, 65, 0.35)`,
                        }
                    }
                    className="w-full h-screen flex justify-center items-center backdrop-blur-sm absolute top-0 left-0 bg-black z-10"
                >
                    <div className="centerContainer flex w-[70%] h-[90%] justify-center relative items-center bg-white rounded-md">
                        {/* Close button to close the popup */}
                        <span
                            onClick={() => {
                                // Toggle the followerPopupOnOff state and dispatch the resetFollowState action
                                setFollowersPopupOnOff(!followerPopupOnOff)
                                dispatch(resetFollowState())
                            }}
                            className="absolute text-2xl top-[3%] right-[2%] cursor-pointer"
                        >
                            {/* CloseIcon component */}
                            {<CloseIcon classess="" />}
                        </span>
                        <div className='flex justify-between w-[90%] p-2 h-[80%] items-center border border-red-500'>
                            {/* Map over the followersAndFollowings array to display each follower or following */}
                            {followersAndFollowings.map((singleObject, index) => (
                                <Fragment key={index}>
                                    {/* If the user is not the same as the one in the URL parameters, display followers */}
                                    {singleObject.user._id !== userId ? (
                                        <Fragment>
                                            <div className='followers border border-blue-500 w-full h-full mx-2'>
                                                <div className="title grid place-content-center">
                                                    <span className='text-2xl font-bold text-center'>Followers</span>
                                                </div>
                                                <span>
                                                    {/* If the followedUserId is the same as the one in the URL parameters, display the name */}
                                                    {singleObject.followedUserId._id === userId ? singleObject.user.name : ""}
                                                </span>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {/* If the user is the same as the one in the URL parameters, display followings */}
                                            <div className='followings border border-blue-500 w-full h-full mx-2'>
                                                <div className="title grid place-content-center">
                                                    <span className='text-2xl font-bold text-center'>Followings</span>
                                                </div>
                                                <span>
                                                    {/* If the followedUserId is not the same as the one in the URL parameters, display the name */}
                                                    {singleObject.followedUserId._id !== userId ? singleObject.followedUserId.name : ""}
                                                </span>
                                            </div>
                                        </Fragment>
                                    )}
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