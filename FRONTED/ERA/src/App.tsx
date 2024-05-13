import { Fragment, Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { _ROUTER } from './router'
import { EditPostPopupContext, LoginDesignContext, PostCreatePopupContext, ProfilePopupContext } from './contaxt'
import { LoaderSpinner } from './components'

function App() {
  const [loginDesign, setLoginDesign] = useState<boolean>(true)
  const [profilePopupOnOff, setProfilePopupOnOff] = useState<boolean>(false)
  const [editPostPopupOnOff, setEditPostPopupOnOff] = useState<boolean>(false)
  const [postCreatePopupOnOff, setPostCreatePopupOnOff] = useState<boolean>(false)

  return (
    <Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <LoginDesignContext.Provider value={{ loginDesign, setLoginDesign }}>
          <ProfilePopupContext.Provider value={{ profilePopupOnOff, setProfilePopupOnOff }}>
            <EditPostPopupContext.Provider value={{ editPostPopupOnOff, setEditPostPopupOnOff }}>
              <PostCreatePopupContext.Provider value={{ postCreatePopupOnOff, setPostCreatePopupOnOff }}>
                <RouterProvider router={_ROUTER} />
              </PostCreatePopupContext.Provider>
            </EditPostPopupContext.Provider>
          </ProfilePopupContext.Provider>
        </LoginDesignContext.Provider>
      </Suspense>
    </Fragment>
  )
}

export default App
