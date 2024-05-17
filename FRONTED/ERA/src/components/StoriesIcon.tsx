import React, { Fragment, Suspense, useEffect, useState } from "react";
import { LoaderSpinner } from ".";
import { user } from "../interfaces";

const StoriesIcon: React.FC = () => {
   const [user, setUser] = useState<user>();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      setUser(user);
   }, []);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="flex flex-col cursor-pointer justify-center items-center mx-3">
               <div className="storiesCircle w-8 border-2 border-[#fc2727] rounded-full">
                  <img
                     loading="lazy"
                     className="rounded-full"
                     src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                     alt=""
                  />
               </div>
               <span>userName</span>
            </div>
         </Suspense>
      </Fragment>
   );
};

export default StoriesIcon;
