import React, { Suspense, memo } from 'react'
import { LoaderSpinner } from '.'

export const Main = memo(() => {
    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>Main</div>
            </Suspense>
        </React.Fragment>
    )
})
