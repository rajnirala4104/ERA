import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../interfaces";

const UserSingleCard: React.FC<user> = (props) => {
   const navigator = useNavigate();

   return (
      <Fragment>
         <div
            onClick={() => navigator(`/user-profile/${props._id}`)}
            className="bg-slate-700 text-white hover:bg-[#2f2f2f] cursor-pointer rounded-md w-full h-[18rem] my-1 flex justify-start items-center py-2 px-2 shadow-md"
         >
            <div className="prfileImage">
               <img
                  loading="lazy"
                  src={props.profilePic}
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                  alt={`ERA-${props.name}`}
               />
            </div>
            <div className="mx-2">
               <span>{props.name}</span>
            </div>
         </div>
      </Fragment>
   );
};

export default UserSingleCard;
