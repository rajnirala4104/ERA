import React, { Fragment, Suspense } from 'react'
import { LoaderSpinner } from './LoaderSpinner'

export const LeftSideBar: React.FC = () => {

    const menusDataObjectsArray = [{}]

    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section className=' border border-red-500 w-full bg-gray-900 text-white'>
                    <div className="menuContainer">

                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}
