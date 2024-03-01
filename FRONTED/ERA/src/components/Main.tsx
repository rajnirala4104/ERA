import React, { Suspense, memo, useEffect } from 'react'
import { LoaderSpinner } from '.'
import { useNavigate } from 'react-router-dom'

export const Main = memo(() => {

    const navigator = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo') as string);

        if (!user) {
            navigator('/account')
        }
    }, [])

    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>Main</div>
            </Suspense>
        </React.Fragment>
    )
})
