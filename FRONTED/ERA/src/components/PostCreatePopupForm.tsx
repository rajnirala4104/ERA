import React, { useContext, useState } from "react";
import { createPostApiCall } from "../api/services/postApiServices";
import { createThoghtPostApiCall } from "../api/services/thoughtPostServices";
import { PostCreatePopupContext } from "../contaxt";
import { CloseIcon } from "../icons";

const PostCreatePopupForm: React.FC = () => {
   const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(
      PostCreatePopupContext
   );

   const [postImage, setPostImage] = useState<File | undefined>();
   const [thoughtPostForm, setThoughtPostForm] = useState(false);

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
               setPostImage(data.url.toString());
            });
      }
   }

   //  -------------------- Post Create Function ---------------------
   // This function handles the submission of a new post.
   // It takes in a form event object from an HTML form element.
   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent the default form submission behavior.
      e.preventDefault();

      // Create a new FormData object from the form data.
      const formData = new FormData(e.target as HTMLFormElement);

      // Parse the user information from the local storage.
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "");

      // Create an object to hold the final data to be sent to the API.
      const finalDataObject = {
         // Set the content of the post to the URL of the uploaded image.
         content: postImage,
         // Set the caption of the post to the value of the caption input field.
         caption: formData.get("caption") as string,
      };

      // Call the createPostApiCall function with the final data object and the user's token.
      // The token is obtained from the user information in the local storage.
      await createPostApiCall(
         finalDataObject,
         loggedUser?.token || ""
      );

      // Reload the window to update the UI with the new post.
      window.location.reload();
   };

   // ----------------------- Thhought Post Create Function -----------------------------
   /**
    * This function handles the submission of a new thought post.
    * It takes in a form event object from an HTML form element.
    *
    * @param {React.FormEvent<HTMLFormElement>} e - The event object from the form submission.
    * @return {Promise<void>} This function does not return anything.
    */
   const ThoughtPostSubmitHandler = async (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      // Prevent the default form submission behavior.
      e.preventDefault();

      // Create a new FormData object from the form data.
      const formData = new FormData(e.target as HTMLFormElement);

      // Parse the user information from the local storage.
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "");

      // Create an object to hold the final data to be sent to the API.
      const finalDataObject = {
         // Set the user ID of the thought post to the ID of the logged-in user.
         user: loggedUser?._id as string,
         // Set the thought of the thought post to the value of the thought input field.
         thought: formData.get("thought") as string,
      };

      // Call the createThoughtPostApiCall function with the final data object and the user's token.
      // The token is obtained from the user information in the local storage.
      await createThoghtPostApiCall(
         finalDataObject,
         loggedUser?.token || ""
      );

      // Reload the window to update the UI with the new thought post.
      window.location.reload();
   };

   return (
      <section
         style={{ background: "rgba(65,65,65,0.35)" }}
         className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 bg-black z-10"
      >
         <div className="flex flex-col w-[60%] h-[80%] justify-center relative items-center bg-white rounded-md">
            <span
               onClick={() => setPostCreatePopupOnOff(!postCreatePopupOnOff)}
               className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer"
            >
               {<CloseIcon classess="" />}
            </span>

            <div className="my-4">
               <span className="font-semibold text-2xl">
                  {!thoughtPostForm ? "Add Post" : "Add Thougth Post"}
               </span>
            </div>
            <div className="my-2 flex flex-col justify-start items-center w-full h-full">
               <form
                  onSubmit={
                     thoughtPostForm ? ThoughtPostSubmitHandler : submitHandler
                  }
                  className="flex flex-col justify-center items-center"
               >
                  <div className="file">
                     {
                        thoughtPostForm ? "" : (
                           <input
                              onChange={postDetails}
                              name="postImage"
                              placeholder="Enter File"
                              type="file"
                              id="postImage"
                              className=""
                           />
                        )
                     }

                  </div>
                  <div className="captin my-2">
                     <textarea
                        rows={5}
                        cols={60}
                        name={thoughtPostForm ? "thought" : "caption"}
                        className="border border-black p-2 rounded-md "
                        placeholder={
                           thoughtPostForm ? "Enter you Thought.." : "Caption.."
                        }
                     />
                  </div>
                  <div className="btn my-4 flex flex-col justify-center items-center">
                     <button
                        type="submit"
                        className="text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md"
                     >
                        {thoughtPostForm ? "Share Thought" : "Create Post"}
                     </button>
                  </div>
               </form>
               <div className="my-2">
                  <span
                     onClick={() => setThoughtPostForm(!thoughtPostForm)}
                     className="underline text-blue-500 cursor-pointer text-center"
                  >
                     {thoughtPostForm ? "Post" : "ThoughtPost"}
                  </span>
               </div>
            </div>
         </div>
      </section>
   );
};

export default PostCreatePopupForm;
