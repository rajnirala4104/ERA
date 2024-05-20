import React, { Fragment, Suspense, memo, useContext } from "react";
import { useDispatch } from "react-redux";
import { SinglePostPopupContext } from "../contaxt";
import { postInterface } from "../interfaces";
import { addPost } from "../redux/states/postSlice";
import { LoaderSpinner } from "./LoaderSpinner";

const ProfilePagePostCard: React.FC<postInterface> = memo((props) => {
   const { singlePostPopupOnOff, setSinglePostPopupOnOff } = useContext(
      SinglePostPopupContext
   );

   const dispatch = useDispatch();

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div
               onClick={() => {
                  dispatch(addPost(props));
                  setSinglePostPopupOnOff(!singlePostPopupOnOff);
               }}
               className="m-1"
            >
               <div className="w-[20rem] h-[20rem] cursor-pointer">
                  <img
                     src={props.content}
                     alt="ERA"
                     className="w-full h-full object-cover rounded-md"
                  />
               </div>
               <span>{props.thought}</span>
            </div>
         </Suspense>
      </Fragment>
   );
});

export default ProfilePagePostCard;
