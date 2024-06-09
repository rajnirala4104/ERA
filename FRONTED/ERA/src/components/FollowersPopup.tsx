import React, { Fragment, Suspense, useContext } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { CloseIcon } from '../icons'
import { FollowersPopupContext } from '../contaxt'

const FollowersPopup: React.FC = () => {

    const { followerPopupOnOff, setFollowersPopupOnOff } = useContext(FollowersPopupContext);

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
                            onClick={() => setFollowersPopupOnOff(!followerPopupOnOff)}
                            className="absolute text-2xl top-[3%] right-[2%] cursor-pointer"
                        >
                            {<CloseIcon classess="" />}
                        </span>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default FollowersPopup