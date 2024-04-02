import React, { Fragment, Suspense, useState } from "react";
import { LoaderSpinner } from ".";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/services/authenticationApiServices";

export const ForgotPasswordForm: React.FC = () => {

   const [newPasswordHideOrShow, setNewPasswordHideOrShow] = useState<boolean>(false)

   const navigator = useNavigate()
   const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const formDataObject = Object.fromEntries(formData.entries());
      try {
         await forgotPassword({
            email: formDataObject.email as string,
            password: formDataObject.password as string
         });

         navigator('/')

      } catch (error) {
         alert(error)
      }
   };

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="border flex flex-col justify-center items-center w-[90%] h-[90%] ">
               <form
                  onKeyDown={(e) => (e.key === "Enter" ? submitFormHandler : "")}
                  onSubmit={(e) => submitFormHandler(e)}
                  className=" flex flex-col justify-center items-center  mx-2"
               >
                  <div className="email ">
                     <input name="email" type="text" placeholder="Email.." className="px-2 py-2 w-[18rem] text-xl focus:border-2 outline-none border rounded-md border-black hover:border-[rgb(7,94,72)] focus:border-[#075e48] my-2" />
                  </div>
                  <div className="newPassword flex justify-between px-2 w-[18rem] border rounded-md border-black focus:border-2 hover:border-[#075e48] focus:border-[#4fe7c1]">
                     <input name="password" className="w-[74%] outline-none text-xl" type={newPasswordHideOrShow ? "text" : "password"} placeholder="New Passwrod.." />
                     <span
                        onClick={() => setNewPasswordHideOrShow(!newPasswordHideOrShow)}
                        className="w-16 text-center cursor-pointer my-[7px] bg-black dark:text-white px-2 py-1 text-[15px] rounded-md hover:bg-gray-800"
                     >
                        {newPasswordHideOrShow ? "Hide" : "Show"}
                     </span>
                  </div>
                  <div className="btn my-3">
                     <button className="bg-[#1aeab6] p-2 rounded-md" type="submit">Create New Password</button>
                  </div>
               </form>
               <div className="">
                  <Link to='/account' className="hover:underline text-blue-500 ">login</Link>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
