import React, { Fragment, Suspense, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostIcons } from ".";
import { SinglePostPopupContext } from "../contaxt";
import { CloseIcon } from "../icons";
import { resetState } from "../redux/states/postSlice";
import { RootState } from "../redux/store";
import { LoaderSpinner } from "./LoaderSpinner";

const SinglePostPopup: React.FC = () => {
   const { singlePostPopupOnOff, setSinglePostPopupOnOff } = useContext(
      SinglePostPopupContext
   );

   const navigator = useNavigate();

   const dispatch = useDispatch();
   const { post } = useSelector((state: RootState) => state);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section
               style={{ background: "rgba(0,0,0, 0.1)" }}
               className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 left-0  bg-black z-10"
            >
               <div className="centerContainer flex w-[70%] h-[90%] justify-between relative items-center bg-white rounded-lg ">
                  <span
                     onClick={() => {
                        dispatch(resetState());
                        setSinglePostPopupOnOff(!singlePostPopupOnOff);
                     }}
                     className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer"
                  >
                     {<CloseIcon classess="" />}
                  </span>
                  {post.thought ? (
                     <Fragment>
                        <div className="ThouhtPost">{post.thought}</div>
                     </Fragment>
                  ) : (
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
                              <div className="caption my-3 px-6 bg-white w-full">
                                 <p className="text-[13px] font-mono font-semibold">
                                    "{post.caption}"
                                 </p>
                              </div>
                              <hr />
                              <div className="comments container overflow-y-auto h-[70%]">
                                 {/* -------- commentes ------- */}
                                 <div className="singleComment shadow-md w-[70%] m-2 rounded-md">
                                    <div className=" cursor-pointer user flex justify-start  p-1 items-center bg-slate-200">
                                       <img
                                          src={post.user?.profilePic}
                                          alt="ERA"
                                          loading="lazy"
                                          className="w-[1.5rem] h-[1.5rem] rounded-full object-cover"
                                       />
                                       <p className="mx-2 text-[12px]">
                                          {post.user?.name}
                                       </p>
                                    </div>
                                    <div className="commentContent">
                                       <p className="text-[13px] p-2">
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit. Iste
                                          voluptates a omnis obcaecati,
                                          distinctio quia quisquam et architecto
                                          consectetur. Laborum.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <hr />
                              <div className="w-full flex justify-start items-center h-[13%] bg-slate-50 px-2">
                                 <div>
                                    <PostIcons />
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
