import React, { Suspense, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftSideBar, LoaderSpinner, Navbar, PostContainer, RightSideBar } from "../components";

export const Home = memo(() => {
   const navigator = useNavigate();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      if (!user) navigator("/account");
   }, []);

   return (
      <React.Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="bg-[#e1f8f2] h-full">
               <div>
                  <Navbar />
               </div>
               <div className="homePageContainer flex justify-between border border-red-500 w-full h-full">
                  <div className="leftSideBar  hidden lg:flex">
                     <LeftSideBar />
                  </div>
                  <div className="centerContentOrPostSection">
                     <PostContainer />
                  </div>
                  <div className="rightSideBar hidden lg:flex">
                     <RightSideBar />
                  </div>
               </div>
            </div>
         </Suspense>
      </React.Fragment>
   );
});
