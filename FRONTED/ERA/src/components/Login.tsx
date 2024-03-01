import React, { Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from '.'
import { login } from '../api/services/authenticationApiServices'

export const Login = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const [userEmail, setUserEmail] = useState<string>()
  const [userPassword, setUserPassword] = useState<string>()

  const submitHandler = async () => {
    if (!userEmail || !userPassword) {
      alert("invailid email and password")
    }
    try {
      const { data } = await login({ email: userEmail, password: userPassword })
      localStorage.setItem('userInfo', JSON.stringify(data))
      console.log(data)
      window.location.reload()
    } catch (error) {
      alert("something went wrong in submitHandler")
    }
  }

  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <div className='h-[100%] flex justify-center items-center flex-col'>
          <div>
            <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
              <input onChange={(e) => setUserEmail(e.target.value)} type="email" className='outline-none text-xl' placeholder='Enter your email...' />
            </div>
            <div className=''>
              <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                <input onChange={(e) => setUserPassword(e.target.value)} type={hidePassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Password..' />
                <button onClick={() => setHidePassword(!hidePassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hidePassword ? "Show" : "Hide"}</button>
              </div>
              <span className='text-blue-500 hover:text-blue-600 cursor-pointer hover:underline'>Forgot password</span>
            </div>
          </div>
          <div className="btn my-4 ">
            <button onClick={() => submitHandler()} className='text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md' >
              Login
            </button>
          </div>
        </div >
      </Suspense >
    </React.Fragment >
  )
}
