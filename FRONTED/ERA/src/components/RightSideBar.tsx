import React, { Fragment, Suspense } from 'react'
import { LoaderSpinner } from './LoaderSpinner';
import UserSingleCard from './UserSingleCard';

const RightSideBar: React.FC = () => {
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className='bg-[#6fc9b3] w-full flex-col flex justify-start items-center'>
                    <div className="rightSideBarTitle flex justify-center items-center">
                        <span className='text-xl font-semibold my-3'>Suggestions</span>
                    </div>
                    <div className="userSingleCardContainer flex flex-col border border-black">
                        <span>Raj Nirala</span>
                        <span>Raj Nirala</span>
                        <span>Raj Nirala</span>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default RightSideBar; 
