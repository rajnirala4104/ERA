import { Fragment, Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { _ROUTER } from './router'
import { LoginDesignContext } from './contaxt'
import { LoaderSpinner } from './components'

function App() {
  const [loginDesign, setLoginDesign] = useState<boolean>(true)
  return (
    <Fragment>
      <LoginDesignContext.Provider value={{ loginDesign, setLoginDesign }}>
        <Suspense fallback={<LoaderSpinner />}>
          <RouterProvider router={_ROUTER} />
        </Suspense>
      </LoginDesignContext.Provider>
    </Fragment>
  )
}

export default App
