import React, { Suspense } from 'react'
import { allImages } from '../assets'
import { LoaderSpinner } from '.'

export const Login = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <section
          style={{ background: `url(${allImages.loginBg})` }}
          className='border border-red-500 w-full h-screen flex justify-center items-center'>
          <div className='border border-red-500 bg-transparent shadow-2xl w-[80%] h-[80%] flex justify-between items-end'>
            <div className="sideImg flex flex-col justify-between items-center w-[45%] h-[100%]">
              <h1 style={{
                fontFamily: ` "Fjalla One", sans-serif`,
                fontWeight: 400,
                fontStyle: "normal",
              }} className='text-6xl mt-20 text-[#0c644e] cursor-default'>ERA</h1>
              <img src={allImages.loginSVG} className='w-[70%]' alt="era" />
            </div>
            <div className="form border-2 border-yellow-500 w-[50%] h-[100%]">
              <form>

              </form>
            </div>
          </div>
        </section>
      </Suspense>
    </React.Fragment>
  )
}
