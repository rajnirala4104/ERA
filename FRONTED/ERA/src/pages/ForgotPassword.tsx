import React, { Fragment, Suspense } from "react";
import { ForgotPasswordForm, LoaderSpinner } from "../components";

export const ForgotPassword: React.FC = () => {
   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section className="w-full h-screen flex justify-center items-center p-2 bg-[#1aeab6]">
               <div className="mainContainer w-[40%] h-[60%] bg-white rounded-md flex justify-center items-center">
                  <ForgotPasswordForm />
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};
