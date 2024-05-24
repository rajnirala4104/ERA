import React, { Fragment, Suspense, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Comment, PostIcons } from ".";
import { deleteApost } from "../api/services/postApiServices";
import { EditPostPopupContext, SinglePostPopupContext } from "../contaxt";
import { CloseIcon, DeleteIcon, EditIcon, SendIcon } from "../icons";
import { resetState } from "../redux/states/postSlice";
import { RootState } from "../redux/store";
import { LoaderSpinner } from "./LoaderSpinner";
import { getDateFromMongoData } from "../utils";

const SinglePostPopup: React.FC = () => {
   const { singlePostPopupOnOff, setSinglePostPopupOnOff } = useContext(
      SinglePostPopupContext
   );

   const navigator = useNavigate();

   const dispatch = useDispatch();
   const { post } = useSelector((state: RootState) => state);
   const { editPostPopupOnOff, setEditPostPopupOnOff } =
      useContext(EditPostPopupContext);

   const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);

   const deletePostHandler = async () => {
      const confirmation = confirm("Do you really want to delete this post? ");
      if (confirmation) {
         await deleteApost(post._id!, loggedUser.token);
         window.location.reload();
      }
   };

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section
               style={{ background: "rgba(65,65,65,0.35)" }}
               className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 left-0  bg-black z-10"
            >
               <div className="centerContainer flex w-[70%] h-[90%] justify-between relative items-center bg-white rounded-lg ">
                  <span className="text-gray-700 flex transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer">
                     {loggedUser._id === post.user?._id ? (
                        <span onClick={() => deletePostHandler()}>
                           <DeleteIcon classess="mx-2" />
                        </span>
                     ) : (
                        ""
                     )}
                     {loggedUser?._id === post.user?._id ? (
                        <span
                           onClick={() => {
                              setEditPostPopupOnOff(!editPostPopupOnOff);
                              setSinglePostPopupOnOff(!singlePostPopupOnOff);
                           }}
                           className="hover:text-black text-gray-700 mx-2 cursor-pointer"
                        >
                           {<EditIcon classess="text-xl " />}
                        </span>
                     ) : (
                        ""
                     )}
                     <span
                        onClick={() => {
                           dispatch(resetState());
                           setSinglePostPopupOnOff(!singlePostPopupOnOff);
                        }}
                     >
                        {<CloseIcon classess="" />}
                     </span>
                  </span>
                  {post.thought ? (
                     // ------------ thought post --------
                     <Fragment>
                        <div className="post flex w-full h-full">
                           <div
                              className="image  w-[50%]  h-full rounded-tl-md rounded-bl-md bg-slate-800 flex justify-center items-center flex-col px-2"
                           >
                              <p className="text-white font-bold w-[70%] text-center">
                                 "{post.thought}"
                              </p>
                           </div>
                           <div className="info w-[50%]">
                              <div className="upperHeader bg-slate-200 py-3 px-2 flex flex-col justify-center items-start rounded-tr-md">
                                 <div
                                    onClick={() =>
                                       navigator(
                                          `/user-profile/${post.user?._id}`
                                       )
                                    }
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
                              <hr />
                              <div className="comments container overflow-y-auto h-[60%]">
                                 {/* -------- commentes ------- */}
                                 <div className="flex flex-col ">
                                    <Comment
                                       user={post.user}
                                       commentContent=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                                          voluptates a omnis obcaecati, distinctio quia quisquam et
                                          architecto consectetur. Laborum."
                                    />
                                    <div className="reply flex justify-end">
                                       <Comment
                                          user={JSON.parse(
                                             localStorage.getItem(
                                                "userInfo"
                                             ) as string
                                          )}
                                          commentContent=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                                          voluptates a omnis obcaecati, distinctio quia quisquam et
                                          architecto consectetur. Laborum."
                                       />
                                    </div>
                                 </div>
                              </div>
                              <hr />
                              <div className="w-full flex flex-col justify-center items-start h-[13%] bg-slate-50 px-2">
                                 <div className="text-[12px]">
                                    <PostIcons />
                                 </div>
                                 <div className="input w-full -my-2 flex justify-between">
                                    <input
                                       type="text"
                                       className="text-[15px] w-[88%] rounded-md py-2 px-2 outline-none border border-black"
                                       placeholder="Comment..."
                                    />
                                    <div className="w-[10%] hover:bg-green-200  grid place-content-center text-2xl rounded-md shadow-md text-white">
                                       <SendIcon classess="" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Fragment>
                  ) : (
                     // ----- post --------------
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
                                    onClick={() =>
                                       navigator(
                                          `/user-profile/${post.user?._id}`
                                       )
                                    }
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
                              <hr />
                              <div className="comments container overflow-y-auto h-[60%]">
                                 {/* -------- commentes ------- */}
                                 <div className="flex flex-col ">
                                    <Comment
                                       user={post.user}
                                       commentContent=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  voluptates a omnis obcaecati, distinctio quia quisquam et
                  architecto consectetur. Laborum."
                                    />
                                    <div className="reply flex justify-end">
                                       <Comment
                                          user={JSON.parse(
                                             localStorage.getItem(
                                                "userInfo"
                                             ) as string
                                          )}
                                          commentContent=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  voluptates a omnis obcaecati, distinctio quia quisquam et
                  architecto consectetur. Laborum."
                                       />
                                    </div>
                                 </div>
                              </div>
                              <hr />
                              <div className="w-full flex flex-col justify-center items-start h-[13%] bg-slate-50 px-2">
                                 <div className="text-[12px]">
                                    <PostIcons />
                                 </div>
                                 <div className="input w-full -my-2 flex justify-between">
                                    <input
                                       type="text"
                                       className="text-[15px] w-[88%] rounded-md py-2 px-2 outline-none border border-black"
                                       placeholder="Comment..."
                                    />
                                    <div className="w-[10%] hover:bg-green-200  grid place-content-center text-2xl rounded-md shadow-md text-white">
                                       <SendIcon classess="" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Fragment>
                  )}
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default SinglePostPopup;
