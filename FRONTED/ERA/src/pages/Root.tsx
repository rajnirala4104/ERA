import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
const Root: React.FC = () => {
   return (
      <Fragment>
         <Outlet />
      </Fragment>
   );
};

export default Root;
