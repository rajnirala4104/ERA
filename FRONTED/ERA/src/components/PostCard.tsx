import React, { Fragment, memo, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostIcons } from ".";
import { SinglePostPopupContext } from "../contaxt";

import { postInterface } from "../interfaces";
import { addPost } from "../redux/states/postSlice";
import { getDateFromMongoData } from "../utils";

const PostCard: React.FC<postInterface> = memo((props) => {
   const navigator = useNavigate();

   const { singlePostPopupOnOff, setSinglePostPopupOnOff } = useContext(
      SinglePostPopupContext
   );

   const dispatch = useDispatch();

   return (
      <Fragment>
         <div className="  my-6   flex flex-col justify-center items-center rounded-lg w-full shadow-lg bg-white">
            <div className="userInfo w-[95%] my-2 flex justify-between items-center ">
               <div
                  onClick={() => navigator(`/user-profile/${props.user?._id}`)}
                  className="flex cursor-pointer justify-center items-center"
               >
                  <img
                     loading="lazy"
                     className="w-[2rem] h-[2rem] rounded-full object-cover"
                     src={props.user?.profilePic}
                     alt="ERA"
                  />
                  <span className="mx-2 font-bold">{props.user?.name}</span>
               </div>
               <div className="flex">
                  <span>{getDateFromMongoData(props.createdAt as string)}</span>
               </div>
            </div>
            <div
               onClick={() => {
                  dispatch(addPost(props));
                  setSinglePostPopupOnOff(!singlePostPopupOnOff);
               }}
               className="content w-[95%] cursor-pointer postCard"
            >
               {/* ------------------------- thought Post Idia ------------ */}
               {props.caption ? (
                  <div
                     style={{
                        background: `url('${props.content}') center center/cover`,
                     }}
                     className="w-[100%] h-[33rem]"
                  ></div>
               ) : (
                  <span className="font-mono font-semibold">
                     "{props.thought}"
                  </span>
               )}
            </div>
            <div className="caption w-[90%] mt-2 font-semibold ">
               <p>{props.caption}</p>
            </div>
            <div className="w-[95%]">
               <PostIcons />
            </div>
         </div>
      </Fragment>
   );
});

export default PostCard;
