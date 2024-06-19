import React, { Suspense, useState } from "react";
import { LoaderSpinner } from ".";
import { signupData } from "../api/apiInterfaces";
import { signup } from "../api/services/authenticationApiServices";


// This component is responsible for the signup functionality of the application.
// It takes user input for name, email, password and profile picture.
// It also provides a way for the user to hide or show the password.
const Singup = () => {
   // State to hold the form data
   const [formData, setFormData] = useState<{ [key: string]: string }>({});
   // State to handle password visibility
   const [hidePassword, setHidePassword] = useState<boolean>(true);
   // State to handle password confirmation visibility
   const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);
   // State to store the uploaded profile picture
   const [profilePic, setProfilePic] = useState<string | undefined>();

   // Function to handle form input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Extract the name and value from the input element
      const { name, value } = e.target;
      // Update the form data state with the new value
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };


   // This function handles the uploading of a profile picture to Cloudinary.
   // It takes in an event object from an HTML input element of type file.
   const postDetails = (pics: React.ChangeEvent<HTMLInputElement>) => {
      // Extract the first file from the input element.
      const fileObject = pics.target.files![0];

      // If there is no file, display an alert and return.
      if (fileObject === undefined) {
         alert("Oops!! image error");
         return;
      }

      // Check if the file type is either 'image/jpeg' or 'image/png'.
      if (fileObject.type === "image/jpeg" || fileObject.type === "image/png") {
         // Create a new FormData object to hold the file data.
         const data = new FormData();

         // Append the file to the FormData object.
         data.append('file', fileObject);

         // Append the upload preset and cloud name to the FormData object.
         // The upload preset and cloud name are specific to our Cloudinary account.
         data.append('upload_preset', 'ERA_910');
         data.append("cloud_name", "eracloud");

         // Send a POST request to Cloudinary's image upload API with the FormData.
         fetch('https://api.cloudinary.com/v1_1/eracloud/image/upload', {
            method: "POST",
            body: data
         })
            // Parse the response as JSON.
            .then((res) => res.json())
            // Update the profilePic state with the URL of the uploaded image.
            .then((data) => {
               setProfilePic(data.url.toString());
            });
      }
   }



   // Function to handle form submission
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent the default form submission behavior
      e.preventDefault();
      // Get the form data object
      const formObject = formData;

      // Check if the password and confirm password match
      if (formObject.password !== formObject.confirmPassword) {
         alert("passwords are not same");
         return;
      }
      // Check if the email and password are valid
      if (!formObject.email || !formObject.password) {
         alert("invalid data given");
         return;
      }
      try {
         // Create the final data object to be sent to the API
         const finalData: signupData = {
            email: formObject.email,
            name: formObject.name,
            password: formObject.confirmPassword,
            profilePic: profilePic,
         };
         console.log(finalData)
         // Call the API to signup the user
         const { data } = await signup(finalData);
         // Store the user information in local storage and reload the page
         localStorage.setItem('userInfo', JSON.stringify(data))
         window.location.reload()
      } catch (error) {
         // Show an error message if the signup fails
         alert("we can't create your account right now");
      }
   };

   // Return the signup form
   return (
      <React.Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <form onSubmit={handleSubmit} className="h-[100%] flex justify-center items-center flex-col">
               <div className="inputs">
                  <div className="inputname my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="outline-none text-xl"
                        placeholder="Enter your name..."
                     />
                  </div>
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="outline-none text-xl"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputemail my-3 border px-2 py-2 border-[#115f4c] rounded-md flex justify-start items-center">
                     <input
                        type="file"
                        name="file"
                        onChange={(e) => postDetails(e)}
                        className="outline-none text-xl"
                        placeholder="Enter your email..."
                     />
                  </div>
                  <div className="inputPassword mt-3 border px-2 py-1 border-[#115f4c] rounded-md flex justify-between items-center">
                     <input
                        name="password"
                        type={hidePassword ? "password" : ""}
                        onChange={handleChange}
                        className="outline-none text-xl"
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
                        onChange={handleChange}
                        className="outline-none text-xl"
                        placeholder="Confirm Password.."
                     />
                     <span
                        onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
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
