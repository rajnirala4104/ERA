import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../interfaces";

const UserSingleCard: React.FC<user> = (props) => {
  const navigator = useNavigate();

  return (
    <Fragment>
      <div
        onClick={() => {
          navigator(`/user-profile/${props._id}`);
          window.location.reload();
        }}
        className="bg-slate-700 text-white hover:bg-[#064737] cursor-pointer rounded-md w-full my-1 flex justify-start items-center py-2 px-2 shadow-md"
      >
        <div className="prfileImage">
          <img
            loading="lazy"
            src={props.profilePic}
            className="w-[2.5rem] h-[2.5rem] my-2 rounded-full object-cover"
            alt={`ERA-${props.name}`}
          />
        </div>
        <div className="mx-2 flex flex-col justify-center items-start  w-[63%]">
          <span>{props.name}</span>
          <span className="text-[12px] font-mono">{props.email}</span>
        </div>
        <div className="">
          <span className="text-[#00ffbf] font-semibold float-end hover:underline my-2 mx-1">
            Follow
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default UserSingleCard;
