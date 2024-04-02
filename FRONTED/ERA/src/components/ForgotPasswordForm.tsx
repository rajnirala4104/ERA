import React, { Fragment, Suspense } from "react";
import { LoaderSpinner } from ".";

export const ForgotPasswordForm: React.FC = () => {
   const submitFormHandler = () => {};

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <form onSubmit={() => submitFormHandler()}></form>
         </Suspense>
      </Fragment>
   );
};
