import React, { Fragment, Suspense, useEffect, useState } from "react";
import { getAllTheUser } from "../api/services/authenticationApiServices";
import { user } from "../interfaces";
import { shuffleArray } from "../utils";
import { LoaderSpinner } from "./LoaderSpinner";
import UserSingleCard from "./UserSingleCard";

/**
 * RightSideBar component is responsible for rendering suggestions for users.
 * 
 * This component fetches all the users from the server and shuffles them before displaying them.
 * The user data is stored in the state using the useState hook.
 * The component also uses the useEffect hook to fetch all the users when the component mounts.
 * The data is fetched by calling the getAllTheUser function from the authenticationApiServices module.
 * The fetched data is stored in the suggestedUser state using the setSuggestedUser function.
 * The component also uses the useEffect hook to set the user data when the component mounts.
 * The user data is fetched from the localStorage and stored in the user state using the setUser function.
 * The component returns a section element that contains the title and the userSingleCardContainer element.
 * The title is a div element with a class name of rightSideBarTitle and contains a span element with the text "Suggestions".
 * The userSingleCardContainer is a div element with a class name of userSingleCardContainer and contains a fragment element.
 * The fragment element contains a map function that iterates over the suggestedUser array and renders a UserSingleCard component for each user.
 * The UserSingleCard component is rendered with the spread operator and the user data as its props.
 */
const RightSideBar: React.FC = () => {
   // Declare state variables for user and suggestedUser
   const [user, setUser] = useState<user>();
   const [suggestedUser, setSuggestedUser] = useState<user[]>();

   /**
    * Fetches all the users from the server and shuffles them before storing them in the suggestedUser state.
    */
   const gettingAllTherUser = async () => {
      const response = await getAllTheUser(user?.token as string);
      setSuggestedUser(shuffleArray(response.data.data));
   };

   // Fetch all the users when the user state changes
   useEffect(() => {
      gettingAllTherUser();
   }, [user]);

   // Set the user data when the component mounts
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      setUser(user);
   }, []);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section className="bg-[#0edaa3] w-full flex-col flex justify-start items-center h-[89vh]">
               <div className="rightSideBarTitle flex justify-center items-center">
                  <span className="text-xl font-semibold my-3">
                     Suggestions
                  </span>
               </div>
               <div className="userSingleCardContainer flex flex-col w-[90%] overflow-y-auto h-[90%] px-2">
                  {suggestedUser?.map((singleObject, index) => (
                     <Fragment key={index}>
                        <UserSingleCard {...singleObject} />
                     </Fragment>
                  ))}
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default RightSideBar;
