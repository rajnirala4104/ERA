import React, { Suspense } from 'react'
import { LoaderSpinner, Login } from '../components'

export const SignupAndLogin = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <section>
          <Login />
        </section>
      </Suspense>
    </React.Fragment>
  )
}
