import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { LeftSideBar } from "../components";
const Root: React.FC = () => {
   return (
      <Fragment>
         <div className="leftSideBar  flex lg:w-full lg:hidden">
            <LeftSideBar />
         </div>
         <Outlet />
      </Fragment>
   );
};

export default Root;
