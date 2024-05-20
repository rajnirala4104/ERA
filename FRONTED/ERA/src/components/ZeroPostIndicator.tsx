import React, { Fragment, Suspense } from "react";
import { CrossIcon } from "../icons";
import { LoaderSpinner } from "./LoaderSpinner";

const ZeroPostIndicator: React.FC = () => {
   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <div className="shadow-md w-[50%] h-[80%] flex flex-col justify-center items-center bg-green-200 rounded-lg">
               <div className="iconContaienr w-[23%] h-[30%] bg-white flex flex-col justify-center items-center rounded-full">
                  <span className="">
                     <CrossIcon classess="text-3xl text-black" />
                  </span>
               </div>
               <div className="my-4">
                  <span className="text-2xl font-semibold">Zero Post Yet</span>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};

export default ZeroPostIndicator;
