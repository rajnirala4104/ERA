import React, { Fragment, Suspense, memo, useContext } from "react";
import { useDispatch } from "react-redux";
import { EditPostPopupContext, SinglePostPopupContext } from "../contaxt";
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
               {props.thought ? (
                  <div className="w-[20rem] flex justify-center items-center shadow-md rounded-md h-[20rem] border-2 border-black cursor-pointer">
                     <span className="text-center font-mono font-semibold m-2">
                        "{props.thought}"
                     </span>
                  </div>
               ) : (
                  <div className="w-[20rem] h-[20rem] cursor-pointer shadow-md">
                     <img
                        src={props.content}
                        alt="ERA"
                        className="w-full h-full object-cover rounded-md"
                     />
                  </div>
               )}
            </div>
         </Suspense>
      </Fragment>
   );
});

export default ProfilePagePostCard;
