import React, { Suspense } from 'react'
import { LoaderSpinner } from '.'

export const Login = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <div>
          login
        </div>
      </Suspense>
    </React.Fragment>
  )
}
