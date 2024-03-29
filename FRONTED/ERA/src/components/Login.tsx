import React, { Suspense, useEffect, useState } from 'react'
import { LoaderSpinner } from '.'
import { login } from '../api/services/authenticationApiServices'

export const Login = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true)

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.target as any);
    const formObject = Object.fromEntries(formData.entries())

    if (!formObject.email || !formObject.password) alert("invailid email and password")

    try {
      const { data } = await login({ email: formObject.email as string, password: formObject.password as string })
      localStorage.setItem('userInfo', JSON.stringify(data))
      window.location.reload()
    } catch (error) { alert("Oops!! there is an error in code") }
  }

  return (
    <React.Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <form onKeyDown={(e) => e.key === "Enter" ? formSubmitHandler : ""} onSubmit={(e) => formSubmitHandler(e)} className='h-[100%] flex justify-center items-center flex-col'>
          <div>
            <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
              <input name='email' type="email" className='outline-none text-xl' placeholder='Enter your email...' />
            </div>
            <div className=''>
              <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                <input name="password" type={hidePassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Password..' />
                <span onClick={() => setHidePassword(!hidePassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hidePassword ? "Show" : "Hide"}</span>
              </div>
              <span className='text-blue-500 hover:text-blue-600 cursor-pointer hover:underline'>Forgot password</span>
            </div>
          </div>
          <div className="btn my-4 ">
            <button type='submit' className='text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md' >
              Login
            </button>
          </div>
        </form >
      </Suspense >
    </React.Fragment >
  )
}
