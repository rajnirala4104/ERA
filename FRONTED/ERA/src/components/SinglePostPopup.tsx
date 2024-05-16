import React, { Fragment, Suspense, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SinglePostPopupContext } from "../contaxt";
import { CloseIcon } from "../icons";
import { postInterface } from "../interfaces";
import { resetState } from "../redux/states/postSlice";
import { RootState } from "../redux/store";
import { LoaderSpinner } from "./LoaderSpinner";

const SinglePostPopup: React.FC<postInterface> = () => {
   const { singlePostPopupOnOff, setSinglePostPopupOnOff } = useContext(
      SinglePostPopupContext
   );

   const dispatch = useDispatch();
   const { post } = useSelector((state: RootState) => state);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section
               style={{ background: "rgba(0,0,0, 0.1)" }}
               className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 left-0  bg-black z-10"
            >
               <div className="centerContainer flex w-[60%] h-[80%] justify-between relative items-center bg-white rounded-md">
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
                        <div className="post">{post.caption}</div>
                     </Fragment>
                  )}
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default SinglePostPopup;
