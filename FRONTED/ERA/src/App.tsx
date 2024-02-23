import { Fragment, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { _ROUTER } from './router'
import { LoginDesignContext } from './contaxt'


function App() {
  const [loginDesign, setLoginDesign] = useState<boolean>(true)
  return (
    <Fragment>
      <LoginDesignContext.Provider value={{ loginDesign, setLoginDesign }}>
        <RouterProvider router={_ROUTER} />
      </LoginDesignContext.Provider>
    </Fragment>
  )
}

export default App
