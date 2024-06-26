import React, { Fragment, Suspense, useContext, useEffect, useState } from "react";
import { EditPostPopupContext } from "../contaxt";
import { CloseIcon } from "../icons";
import { LoaderSpinner } from "./LoaderSpinner";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store'
import { getDateFromMongoData } from "../utils";
import { updatePost } from "../api/services/postApiServices";
import { user } from "../interfaces";
import { updateThoughtPost } from "../api/services/thoughtPostServices";


const EditPostPopup: React.FC = () => {
   const { editPostPopupOnOff, setEditPostPopupOnOff } =
      useContext(EditPostPopupContext);

   const { post } = useSelector((state: RootState) => state);
   const [newCaption, setNewCaption] = useState<string>(post.caption as string)
   const [newThought, setNewThought] = useState<string>(post.thought as string)
   const [user, setUser] = useState<user>()
   const [loading, setLoading] = useState<boolean>(false);

   const updateHandler = async () => {
      const updateConfirmation = confirm("Do you really want to update this post's caption");
      if (updateConfirmation) {
         setLoading(true)
         await updatePost(post._id!, user?.token!, newCaption)
         setLoading(false)
         window.location.reload();
      } else {
         setEditPostPopupOnOff(!editPostPopupOnOff)
      }
   }

   const thoughtUpdateHandler = async () => {
      const updateThoughtConfirmation = confirm("Do you really want to update thought");
      if (updateThoughtConfirmation) {
         setLoading(true)
         await updateThoughtPost(post._id!, user?.token!, newThought);
         setLoading(false)
         window.location.reload()
      }
   }

   useEffect(() => {
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);
      setUser(loggedUser)
   }, [])

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <section
               style={{
                  background: `rgba(65, 65, 65, 0.35)`,
               }}
               className="w-full h-screen flex justify-center items-center backdrop-blur-sm absolute top-0 left-0 bg-black z-10"
            >
               <div className="centerContainer flex w-[70%] h-[90%] justify-center relative items-center bg-white rounded-md">
                  <span
                     onClick={() => setEditPostPopupOnOff(!editPostPopupOnOff)}
                     className="absolute text-2xl top-[3%] right-[2%] cursor-pointer"
                  >
                     {<CloseIcon classess="" />}
                  </span>

                  {/* ------------ main design ---------------- */}
                  <div className="mainDesign w-full h-full flex ">
                     {post.thought ? (
                        <Fragment>
                           {/* ----------- thought post --------- */}
                           <div className="post flex w-full h-full">
                              <div
                                 className="image  w-[50%]  h-full rounded-tl-md rounded-bl-md bg-slate-800 flex justify-center items-center flex-col px-2"
                              >
                                 <textarea
                                    value={newThought}
                                    onChange={(e) => setNewThought(e.target.value)}
                                    rows={10}
                                    className="text-white bg-transparent font-bold w-[70%] text-center">
                                 </textarea>
                              </div>
                              <div className="info w-[50%]">
                                 <div className="upperHeader bg-slate-200 py-3 px-2 flex flex-col justify-center items-start rounded-tr-md">
                                    <div
                                       className="flex justify-center items-center cursor-pointer"
                                    >
                                       <img
                                          src={post.user?.profilePic}
                                          alt="ERA"
                                          loading="lazy"
                                          className="w-[3rem] h-[3rem] rounded-full object-cover"
                                       />
                                       <p className="mx-2 text-xl">
                                          {post.user?.name}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="caption my-3 flex justify-between items-center px-6 bg-white w-full">
                                    <p className="text-[13px] font-mono font-semibold w-[70%]">
                                       "{post.caption}"
                                    </p>
                                    <p className="font-semibold font-sans ">{getDateFromMongoData(post.createdAt!)}</p>
                                 </div>
                                 <div className=" h-[75%] w-full flex justify-center items-center">
                                    <button
                                       onClick={() => thoughtUpdateHandler()}
                                       className="p-2 text-xl hover:bg-slate-800 bg-black rounded-md text-white">
                                       {loading ? (
                                          <i className="fa fa-spinner fa-spin"></i>
                                       ) : ""}
                                       {" "}
                                       Update Thought
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </Fragment>
                     ) : (
                        <Fragment>
                           {/* --------- post ----------- */}
                           <Fragment>
                              <div className="post flex w-full h-full">
                                 <div
                                    className="image  w-[50%]  h-full rounded-tl-md rounded-bl-md"
                                    style={{
                                       background: `url(${post.content}) center center/cover`,
                                    }}
                                 ></div>
                                 <div className="info w-[50%]">
                                    <div className="upperHeader bg-slate-200 py-3 px-2 flex flex-col justify-center items-start rounded-tr-md">
                                       <div
                                          className="flex justify-center items-center cursor-pointer"
                                       >
                                          <img
                                             src={post.user?.profilePic}
                                             alt="ERA"
                                             loading="lazy"
                                             className="w-[3rem] h-[3rem] rounded-full object-cover"
                                          />
                                          <p className="mx-2 text-xl">
                                             {post.user?.name}
                                          </p>
                                       </div>
                                    </div>
                                    <div
                                       className="caption my-3 flex justify-between items-center px-6 bg-white w-full">
                                       <textarea
                                          onChange={(e) => setNewCaption(e.target.value)}
                                          className="text-[13px] font-mono font-semibold w-[70%]"
                                          value={newCaption}>
                                       </textarea>
                                       <p className="font-semibold font-sans ">{getDateFromMongoData(post.createdAt!)}</p>
                                    </div>
                                    <hr />
                                    <div className=" h-[75%] w-full flex justify-center items-center">
                                       <button
                                          onClick={() => updateHandler()}
                                          className="p-2 text-xl hover:bg-slate-800 bg-black rounded-md text-white">
                                          {loading ? (
                                             <i className="fa fa-spinner fa-spin"></i>
                                          ) : ""}
                                          {" "}
                                          Update
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </Fragment>
                        </Fragment>
                     )}



                  </div>

               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default EditPostPopup;
