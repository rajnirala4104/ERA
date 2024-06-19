import React from 'react'
import '../css/loader.css'

export const LoaderSpinner = () => {
   return (
      <React.Fragment>
         <div id="loader" className='m-auto absolute top-[50%] left-[50%] z-50'></div>
      </React.Fragment>
   )
}
