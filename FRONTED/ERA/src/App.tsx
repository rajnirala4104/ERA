import { Fragment, Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { _ROUTER } from './router'
import { LoginDesignContext, ProfilePopupContext } from './contaxt'
import { LoaderSpinner } from './components'

function App() {
  const [loginDesign, setLoginDesign] = useState<boolean>(true)
  const [profilePopupOnOff, setProfilePopupOnOff] = useState<boolean>(false)
  return (
    <Fragment>
      <LoginDesignContext.Provider value={{ loginDesign, setLoginDesign }}>
        <ProfilePopupContext.Provider value={{ profilePopupOnOff, setProfilePopupOnOff }}>
          <Suspense fallback={<LoaderSpinner />}>
            <RouterProvider router={_ROUTER} />
          </Suspense>
        </ProfilePopupContext.Provider>
      </LoginDesignContext.Provider>
    </Fragment>
  )
}

export default App
