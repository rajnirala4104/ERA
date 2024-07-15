import React, { Fragment } from "react";
import { CommentIcon, UnLikeIcon } from "../icons";

const PostIcons: React.FC = () => {
   return (
      <Fragment>
         <div className="iconsContainer flex w-[40%] my-2 justify-between ">
            <div className=" flex justify-center items-center hover:bg-green-200 rounded-md cursor-pointer px-2 py-1">
               <UnLikeIcon classess="mx-1 text-2xl" />
               <span className="lg:text-[15px]">Like</span>
            </div>
            <span className="text-gray-500 text-xl">|</span>
            <div className="flex justify-center items-center  hover:bg-green-200  rounded-md cursor-pointer px-2 py-1">
               <CommentIcon classess="mx-1 text-2xl" />
               <span className="lg:text-[15px]">Comment</span>
            </div>
         </div>
      </Fragment>
   );
};

export default PostIcons;
