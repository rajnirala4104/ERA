import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuInterface } from "../interfaces";

/**
 * SingleLeftSideBarMenu is a functional component that renders a single left sidebar menu item.
 * It takes in a menuInterface object as a prop and renders a div with click event handler that
 * navigates to the specified path when clicked.
 *
 * @param {menuInterface} props - An object containing the properties for the menu item.
 * @returns {JSX.Element} - A div element representing the menu item.
 */
const SingleLeftSideBarMenu: React.FC<menuInterface> = (props) => {
   // Hook to get the navigate function from react-router-dom
   const navigator = useNavigate();
   const { pathname } = useLocation();

   /**
    * Handler function for the click event on the menu item.
    * Navigates to the specified path using the navigate function.
    */
   const clickHandler = () => {
      navigator(props.path);
      if (
         pathname.split("/")[2] ===
         JSON.parse(localStorage.getItem("userInfo") as string)._id
      ) {
         window.location.reload();
      }
   };

   return (
      <Fragment>
         {/* Div element representing the menu item */}
         <div
            // Click event handler
            onClick={() => clickHandler()}
            // CSS classes for styling the menu item
            className="sinpleMen cursor-pointer lg:w-[90%] hover:bg-slate-700 transition transition-duration-300 flex justify-start items-center bg-slate-800 lg:hover:bg-slate-700 lg:bg-slate-800 m-2 h-10 rounded-md "
         >
            {/* Div element for the icon */}
            <div className="icon">{props.icon}</div>
            {/* Div element for the menu name */}
            <div className="menuName mx-2 ">
               {/* Span element for the menu name */}
               <span>{props.menuName}</span>
            </div>
         </div>
      </Fragment>
   );
};

export default SingleLeftSideBarMenu;
