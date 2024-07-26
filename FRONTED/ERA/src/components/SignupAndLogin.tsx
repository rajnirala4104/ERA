import React, { Suspense, useContext, useEffect } from 'react'
import { LoaderSpinner, Login, Singup } from '.'
import { allImages } from '../assets'
import { LoginDesignContext } from '../contaxt'
import { useNavigate } from 'react-router-dom'

const SignupAndLogin = () => {

  const { loginDesign, setLoginDesign } = useContext(LoginDesignContext)

  const navigator = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo') as string);
    if (user) navigator('/');
  }, [])
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <section
          style={{ background: `url(${allImages.loginBg}) center center/cover` }}
          className='w-full h-screen flex justify-center items-center'>
          <div
            style={{
              background: ''
            }}
            className='bg-["rgba(0,0,0,.1)"] backdrop-blur-md rounded-lg shadow-[0_00px_60px_-6px_rgba(0,0,0,0.5)] w-[80%] lg:h-[80%] h-[40%] flex lg:justify-between justify-center items-center '>
            <div className="sideImg hidden lg:flex flex-col justify-between items-center w-[45%] h-[100%] ">
              <h1 style={{
                fontFamily: ` "Fjalla One", sans-serif`,
                fontWeight: 400,
                fontStyle: "normal",
              }} className='text-5xl mt-20  text-[#0c644e] cursor-default'>ERA</h1>
              <img loading='lazy' src={allImages.loginSVG} className='w-[70%] mb-4' alt="era" />
            </div>

            <div
              className="w-[50%] h-[87%]  flex justify-center items-center flex-col ">
              {loginDesign ? <Login /> : <Singup />}
              <span onClick={() => setLoginDesign(!loginDesign)} className='text-blue-700 font-semibold  hover:underline cursor-pointer'>{loginDesign ? "Don't have account" : "have account"}</span>
            </div>
          </div>
        </section>
      </Suspense>
    </React.Fragment>
  )
}

export default SignupAndLogin;