import React, { Suspense, useState } from 'react'
import { LoaderSpinner } from '.'
import { signup } from '../api/services/authenticationApiServices'

export const Singup = () => {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [userName, setUserName] = useState<string>()
    const [userEmail, setUserEmail] = useState<string>()
    const [userPassword, setUserPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()

    const subimtHandler = async () => {
        if (userPassword !== confirmPassword) {
            alert("passwords are not same")
        }
        if (!userEmail || !confirmPassword) {
            alert("inVailid data given")
        }
        try {
            console.log("entered in try")
            const response = await signup({ email: userEmail, name: userName, password: confirmPassword })
            console.log(response)
            // localStorage.setItem('userInfo', JSON.stringify(data))
            // window.location.reload()
        } catch (error) {
            alert("we can't create your account right now")
        }
    }

    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className='h-[100%] flex justify-center items-center flex-col'>
                    <div className="inputs">
                        <div className="inputname my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                            <input type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                className='outline-none text-xl' placeholder='Enter your name...' />
                        </div>
                        <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                            <input type="email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                className='outline-none text-xl' placeholder='Enter your email...' />
                        </div>
                        <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                            <input
                                onChange={(e) => setUserPassword(e.target.value)}
                                type={hidePassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Password..' />
                            <button onClick={() => setHidePassword(!hidePassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hidePassword ? "Show" : "Hide"}</button>
                        </div>
                        <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={hidePassword ? 'password' : ""} className='outline-none text-xl ' placeholder='Confirm Password..' />
                            <button onClick={() => setHidePassword(!hidePassword)} className='w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800'>{hidePassword ? "Show" : "Hide"}</button>
                        </div>
                    </div>
                    <div className="btn my-4 ">
                        <button
                            onClick={() => subimtHandler()}
                            className='text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md' >
                            Signup
                        </button>
                    </div>
                </div>
            </Suspense>
        </React.Fragment>
    )
}
