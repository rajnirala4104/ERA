import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderSpinner } from ".";
import { login } from "../api/services/authenticationApiServices";

// This is the Login component which handles the login functionality.
// It uses the useState hook to manage the state of hidePassword.
const Login = () => {
   // Initializing hidePassword state to true.
   const [hidePassword, setHidePassword] = useState<boolean>(true);

   // This is the form submit handler which handles the form submission.
   const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      // Preventing the default form submission behavior.
      e.preventDefault();
      // Creating a new FormData object from the form data.
      const formData = new FormData(e.target as HTMLFormElement);
      // Convert the FormData object to a key-value object.
      const formObject = Object.fromEntries(formData.entries());
      try {
         // Checking if email and password are provided.
         if (!formObject.email || !formObject.password) {
            // If not, alerting the user.
            alert("invailid email and password");
         } else {
            // If provided, sending a login request to the server.
            const response = await login({
               email: formObject.email as string,
               password: formObject.password as string,
            });
            // Storing the user information in the local storage.
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            // Reloading the page.
            window.location.reload();
         }
      } catch {
         // If there is an error, alerting the user.
         alert("something went wrong, check given values");
      }
   };

   // Rendering the Login component.
   return (
      <React.Fragment>
         {/* Wrapping the form in a Suspense component with a loader spinner. */}
         <Suspense fallback={<LoaderSpinner />}>
            <form
               // Handling form submission and key press events.
               onKeyDown={(e) => (e.key === "Enter" ? formSubmitHandler : "")}
               onSubmit={(e) => formSubmitHandler(e)}
               className="h-[100%] flex justify-center items-center flex-col"
            >
               <div>
                  {/* Email input field. */}
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        name="email"
                        type="email"
                        className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-medium"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="">
                     {/* Password input field with show/hide password toggle. */}
                     <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                        <input
                           name="password"
                           type={hidePassword ? "password" : ""}
                           className="outline-none text-xl bg-transparent lg:placeholder:font-normal placeholder:text-gray-800 placeholder:font-medium "
                           placeholder="Password.."
                        />
                        <span
                           onClick={() => setHidePassword(!hidePassword)}
                           className="w-16 text-center cursor-pointer  bg-black dark:text-white px-2 py-2 text-[14px] rounded-md hover:bg-gray-800"
                        >
                           {/* Show/Hide password button. */}
                           {hidePassword ? "Show" : "Hide"}
                        </span>
                     </div>
                     {/* Forgot password link. */}
                     <Link
                        to="/password"
                        className="text-blue-700 font-semibold lg:font-normal hover:text-blue-600 cursor-pointer hover:underline"
                     >
                        Forgot password
                     </Link>
                  </div>
               </div>
               <div className="btn my-4 ">
                  {/* Login button. */}
                  <button
                     type="submit"
                     className="text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md"
                  >
                     Login
                  </button>
               </div>
            </form>
         </Suspense>
      </React.Fragment>
   );
};

export default Login;
