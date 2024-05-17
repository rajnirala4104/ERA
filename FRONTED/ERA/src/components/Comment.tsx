import React, { Fragment } from "react";
import { commentInterface } from "../interfaces";

const Comment: React.FC<commentInterface> = (props) => {
   return (
      <Fragment>
         <div className="singleComment shadow-md w-[70%] m-2 rounded-md">
            <div className=" cursor-pointer user flex justify-start  p-1 items-center bg-slate-200">
               <img
                  src={props.user?.profilePic}
                  alt="ERA"
                  loading="lazy"
                  className="w-[1.5rem] h-[1.5rem] rounded-full object-cover"
               />
               <p className="mx-2 text-[12px]">{props.user?.name}</p>
            </div>
            <div className="commentContent">
               <p className="text-[13px] p-2">{props.commentContent}</p>
            </div>
         </div>
      </Fragment>
   );
};

export default Comment;
