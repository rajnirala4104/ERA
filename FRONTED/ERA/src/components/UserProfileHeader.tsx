import React, { Fragment, Suspense } from 'react'
import { user } from '../interfaces'
import { LoaderSpinner } from './LoaderSpinner'

export const UserProfileHeader: React.FC<user> = (props) => {
    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>
                    <div>
                        <img src={props.pic} className='rounded-full w-20' alt="era user" />
                        <span>{props.name}</span>
                    </div>
                    <div className="followInfo">

                    </div>
                </div>
            </Suspense>
        </Fragment>
    )
}
