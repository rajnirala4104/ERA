import React, { Fragment, Suspense, useContext } from 'react'
import { ProfilePopupContext } from '../contaxt'
import { LoaderSpinner } from './LoaderSpinner'
import { CloseIcon } from '../icons'

const ProfilePopup: React.FC = () => {

    const { profilePopupOnOff, setProfilePopupOnOff } = useContext(ProfilePopupContext)

    console.log(profilePopupOnOff)
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.45)] backdrop-blur-sm absolute top-0 bg-black z-10'>
                    <div className="centerContainer flex justify-center relative items-center bg-white w-[60%] h-[40%] rounded-md">
                        <span onClick={() => setProfilePopupOnOff(!profilePopupOnOff)} className='text-2xl absolute top-[7%] right-[3%] cursor-pointer'>{<CloseIcon classess='' />}</span>
                        <span>
                            Main Contaiener
                        </span>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default ProfilePopup