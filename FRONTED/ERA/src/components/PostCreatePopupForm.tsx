import React, { useContext, useState } from "react";
import { createPostApiCall } from "../api/services/postApiServices";
import { createThoghtPostApiCall } from "../api/services/thoughtPostServices";
import { PostCreatePopupContext } from "../contaxt";
import { CloseIcon } from "../icons";
import { postInterface } from "../interfaces";

const PostCreatePopupForm: React.FC = () => {
   const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(
      PostCreatePopupContext
   );

   const [postImage, setPostImage] = useState<File | undefined>();
   const [thoughtPostForm, setThoughtPostForm] = useState(false);
   const [allPostsAndThoughtPosts, setAllPostsAndThoughtPosts] = useState<postInterface[] | undefined>();

   const postDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
         alert("Oops!! image error");
         return;
      }
      setPostImage(file);
   };

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "");

      const finalDataObject = {
         content: postImage,
         caption: formData.get("caption") as string,
      };
      const response = await createPostApiCall(
         finalDataObject,
         loggedUser?.token || ""
      );
      setAllPostsAndThoughtPosts((prev) => [...(prev || []), response.data.data]);
      window.location.reload();
   };

   const ThoughtPostSubmitHandler = async (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "");

      const finalDataObject = {
         user: loggedUser?._id as string,
         thought: formData.get("thought") as string,
      };
      const response = await createThoghtPostApiCall(
         finalDataObject,
         loggedUser?.token || ""
      );
      setAllPostsAndThoughtPosts((prev) => [...(prev || []), response.data.data]);
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
                     <input
                        onChange={postDetails}
                        name="postImage"
                        placeholder="Enter File"
                        type="file"
                        id="postImage"
                        className=""
                     />
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
