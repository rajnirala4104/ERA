import { Fragment } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { _ROUTER } from './router'

function App() {
  return (
    <Fragment>
      <RouterProvider router={_ROUTER} />
    </Fragment>
  )
}

export default App
