import React, { Fragment, Suspense, useContext } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { CloseIcon } from '../icons'
import { EditPostPopupContext } from '../contaxt'

const EditPostPopup: React.FC = () => {

    const { editPostPopupOnOff, setEditPostPopupOnOff } = useContext(EditPostPopupContext)

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='w-full h-screen flex justify-center items-center bg-[rgba(65,65,65,0.35)] backdrop-blur-sm absolute top-0 bg-black z-10'>
                    <div className="centerContainer flex w-[60%] h-[80%] justify-between relative items-center bg-white rounded-md">
                        <span onClick={() => setEditPostPopupOnOff(!editPostPopupOnOff)} className='absolute text-2xl top-[3%] right-[2%] cursor-pointer'>{<CloseIcon classess='' />}</span>
                        edit post popup
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default EditPostPopup