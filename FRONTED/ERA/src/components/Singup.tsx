import React, { Suspense, useState } from 'react'
import { LoaderSpinner } from '.'
import { signup } from '../api/services/authenticationApiServices'

export const Singup = () => {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true)

    const subimtHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as any);
        const formObject = Object.fromEntries(formData.entries())

        if (formObject.password !== formObject.confirmPassword) {
            alert("passwords are not same")
            return;
        }
        if (!formObject.email || !formObject.password) {
            alert("inVailid data given")
            return;
        }
        try {
            const { data } = await signup({
                email: formObject.email as string,
                name: formObject.name as string,
                password: formObject.confirmPassword as string
            })
            console.log(data)
            // localStorage.setItem('userInfo', JSON.stringify(data))
            // window.location.reload()
        } catch (error) { alert("we can't create your account right now") }
    }

    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <form onSubmit={(e) => subimtHandler(e)} className='h-[100%] flex justify-center items-center flex-col'>
                    <div className="inputs">
                        <div className="inputname my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                            <input
                                type="text"
                                name="name"
                                className='outline-none text-xl' placeholder='Enter your name...' />
                        </div>
                        <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                            <input type="email"
                                name='email'
                                className='outline-none text-xl' placeholder='Enter your email...' />
                        </div>
                        <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                            <input
                                name="password"
                                type={hidePassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Password..' />
                            <span onClick={() => setHidePassword(!hidePassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hidePassword ? "Show" : "Hide"}</span>
                        </div>
                        <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                            <input
                                name="confirmPassword"
                                type={hideConfirmPassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Confirm Password..' />
                            <span onClick={() => setHideConfirmPassword(!hideConfirmPassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hideConfirmPassword ? "Show" : "Hide"}</span>
                        </div>
                    </div>
                    <div className="btn my-4 ">
                        <button
                            type='submit'
                            className='text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md' >
                            Signup
                        </button>
                    </div>
                </form>
            </Suspense>
        </React.Fragment>
    )
}
