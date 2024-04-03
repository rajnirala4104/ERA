import React, { Suspense, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderSpinner, Navbar } from "../components";

export const Home = memo(() => {
   const navigator = useNavigate();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      if (!user) navigator("/account");
   }, []);

   return (
      <React.Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="bg-[#e1f8f2] h-screen">
               <Navbar />
            </div>
         </Suspense>
      </React.Fragment>
   );
});
