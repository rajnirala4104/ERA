import React, { Suspense } from 'react'
import { LoaderSpinner } from '.'

export const Singup = () => {
    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>
                    <div className="inputs">
                        <div className="inputName">
                            <input type="text" placeholder='enter your name' />
                        </div>
                        <div className="inputEmail">
                            <input type="text" placeholder='enter your email' />
                        </div>
                        <div className="inputPassword">
                            <input type="text" placeholder='enter your password' />
                        </div>
                    </div>
                </div>
            </Suspense>
        </React.Fragment>
    )
}
