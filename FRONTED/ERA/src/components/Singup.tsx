import React, { Suspense, useState } from "react";
import { LoaderSpinner } from ".";
import { signupData } from "../api/apiInterfaces";
import { signup } from "../api/services/authenticationApiServices";


const Singup = () => {
   const [hidePassword, setHidePassword] = useState<boolean>(true);
   const [hideConfirmPassword, setHideConfirmPassword] =
      useState<boolean>(true);
   const [profilePic, setProfilePic] = useState<string>()


   const postDetails = (pics: React.ChangeEvent<HTMLInputElement>) => {
      const fileObject = pics.target.files![0];
      if (fileObject === undefined) {
         alert("Oops!! image error");
         return;
      }
      if (fileObject.type === "image/jpeg" || fileObject.type === "image/png") {
         const data = new FormData();
         data.append('file', fileObject);
         data.append('upload_preset', 'ERA_910');
         data.append("cloud_name", "eracloud");

         fetch('https://api.cloudinary.com/v1_1/eracloud/image/upload', {
            method: "POST",
            body: data
         }).then((res) => res.json()).then((data) => {
            setProfilePic(data.url.toString());
         })

      }

   }

   const subimtHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const formObject = Object.fromEntries(formData.entries());

      if (formObject.password !== formObject.confirmPassword) {
         alert("passwords are not same");
         return;
      }
      if (!formObject.email || !formObject.password) {
         alert("inVailid data given");
         return;
      }
      try {
         const finalData: signupData = {
            email: formObject.email as string,
            name: formObject.name as string,
            password: formObject.confirmPassword as string,
            profilePic: profilePic as string
         };
         const { data } = await signup(finalData);
         localStorage.setItem('userInfo', JSON.stringify(data))
         window.location.reload()
      } catch (error) {
         alert("we can't create your account right now");
      }
   };



   return (
      <React.Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <form
               onKeyDown={(e) => (e.key === "Enter" ? subimtHandler : "")}
               onSubmit={(e) => subimtHandler(e)}
               className="h-[100%] flex justify-center items-center flex-col"
            >
               <div className="inputs">
                  <div className="inputname my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="text"
                        name="name"
                        className="outline-none text-xl"
                        placeholder="Enter your name..."
                     />
                  </div>
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="email"
                        name="email"
                        className="outline-none text-xl"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <label htmlFor="userImage"></label>
                     <input
                        type="file"
                        name="file"
                        id="userImage"
                        onChange={(e) => postDetails(e)}
                        className="outline-none text-xl"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                     <input
                        name="password"
                        type={hidePassword ? "password" : ""}
                        className="outline-none text-xl "
                        placeholder="Password.."
                     />
                     <span
                        onClick={() => setHidePassword(!hidePassword)}
                        className="w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800"
                     >
                        {hidePassword ? "Show" : "Hide"}
                     </span>
                  </div>
                  <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                     <input
                        name="confirmPassword"
                        type={hideConfirmPassword ? "password" : ""}
                        className="outline-none text-xl "
                        placeholder="Confirm Password.."
                     />
                     <span
                        onClick={() =>
                           setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800"
                     >
                        {hideConfirmPassword ? "Show" : "Hide"}
                     </span>
                  </div>
               </div>
               <div className="btn my-4 ">
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
