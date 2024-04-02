import React, { Fragment, Suspense, useState } from "react";
import { LoaderSpinner } from ".";
import { Link } from "react-router-dom";

export const ForgotPasswordForm: React.FC = () => {

   const [newPasswordHideOrShow, setNewPasswordHideOrShow] = useState<boolean>(false)

   const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const formDataObject = Object.fromEntries(formData.entries());

      console.log(formDataObject);

   };

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="border flex flex-col justify-center items-center w-[90%] h-[90%] ">
               <form
                  onSubmit={(e) => submitFormHandler(e)}
                  className=" flex flex-col justify-center items-center  mx-2"
               >
                  <div className="email ">
                     <input name="email" type="text" placeholder="Email.." className="px-2 py-2 w-[16.5rem] outline-none border-2 rounded-md border-black hover:border-[rgb(7,94,72)] focus:border-[#075e48] my-2" />
                  </div>
                  <div className="newPassword">
                     <input name="userNamePassword" className="px-2 py-2 w-[16.5rem] outline-none border-2 rounded-md border-black hover:border-[#075e48] focus:border-[#075e48] my-1" type={newPasswordHideOrShow ? "text" : "password"} placeholder="New Passwrod.." />
                  </div>
                  <div className="btn my-3">
                     <button className="bg-[#1aeab6] p-2 rounded-md" type="submit">Create New Password</button>
                  </div>
               </form>
               <div className="">
                  <Link to='/account' className="underline text-blue-500 ">login</Link>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
