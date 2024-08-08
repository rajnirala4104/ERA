import React, { Suspense, useState } from "react";
import { LoaderSpinner } from ".";
import { signup } from "../api/services/authenticationApiServices";
import { FormObject } from "../interfaces";

const Singup = () => {
   const [hidePassword, setHidePassword] = useState<boolean>(true);
   const [hideConfirmPassword, setHideConfirmPassword] =
      useState<boolean>(true);
   const [profilePic, setProfilePic] = useState<File | null>();

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setProfilePic(e.target.files[0]);
      }
   };
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);

      // Convert FormData to an object
      const formObject = Object.fromEntries(formData.entries()) as FormObject;

      formData.append("profilePic", profilePic);

      try {
         const { data } = await signup(formObject); // Assuming signup is a function that returns a Promise
         localStorage.setItem("userInfo", JSON.stringify(data));
         window.location.reload();
      } catch (error) {
         console.error("Signup failed:", error);
      }
   };

   // Return the signup form
   return (
      <React.Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <form
               onSubmit={(e) => handleSubmit(e)}
               className="h-[100%] flex justify-center items-center flex-col"
            >
               <div className="inputs w-[80%]">
                  <div className="inputname my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="text"
                        name="name"
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-semibold"
                        placeholder="Enter your name..."
                     />
                  </div>

                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="email"
                        name="email"
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-semibold"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="file"
                        name="profilePic"
                        onChange={(e) => onInputChange(e)}
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-semibold"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                     <input
                        name="password"
                        type={hidePassword ? "password" : ""}
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-semibold"
                        placeholder="Password.."
                     />
                     <span
                        onClick={() => setHidePassword(!hidePassword)}
                        className="w-16 text-center cursor-pointer bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800"
                     >
                        {hidePassword ? "Show" : "Hide"}
                     </span>
                  </div>
                  <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                     <input
                        name="confirmPassword"
                        type={hideConfirmPassword ? "password" : ""}
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-semibold"
                        placeholder="Confirm Password.."
                     />
                     <span
                        onClick={() =>
                           setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="w-16 text-center cursor-pointer bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800"
                     >
                        {hideConfirmPassword ? "Show" : "Hide"}
                     </span>
                  </div>
               </div>
               <div className="btn my-4">
                  <button
                     type="submit"
                     className="text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md"
                  >
                     Signup
                  </button>
               </div>
            </form>
         </Suspense>
      </React.Fragment>
   );
};

export default Singup;
