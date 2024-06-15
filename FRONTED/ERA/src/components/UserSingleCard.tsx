import React from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../interfaces";

const UserSingleCard: React.FC<user> = ({ _id, profilePic, name, email }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user-profile/${_id}`);
  };

  return (
    <div
      className="bg-slate-700 text-white hover:bg-[#064737] cursor-pointer rounded-md w-full my-1 flex justify-start items-center py-2 px-2 shadow-md"
      onClick={handleClick}
    >
      <div className="prfileImage">
        <img
          loading="lazy"
          src={profilePic}
          className="w-[2.5rem] h-[2.5rem] my-2 rounded-full object-cover"
          alt={`ERA-${name}`}
        />
      </div>
      <div className="mx-2 flex flex-col justify-center items-start w-[63%]">
        <span>{name}</span>
        <span className="text-[12px] font-mono">{email}</span>
      </div>
      <span className="text-[#00ffbf] font-semibold float-end hover:underline my-2 mx-1">
        Follow
      </span>
    </div>
  );
};

export default UserSingleCard;
