import React, { Fragment, Suspense, useContext, useEffect, useState } from "react";
import { ProfilePopupContext, FollowersPopupContext } from "../contaxt";
import { followeInterface, followersAndFollowings, user } from "../interfaces";
import { LoaderSpinner } from "./LoaderSpinner";
import { getAllTheFollowersOfAPerticularUserApiCall, getAllTheFollowingsOfAPerticularUserApiCall } from "../api/services/followApiServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFollwersAndFollowings, resetFollowState } from "../redux/states/usersFollowersAndFollowings";
import { capitalize } from "../utils";

const UserProfileHeader: React.FC<user> = (props) => {
   const { profilePopupOnOff, setProfilePopupOnOff } = useContext(ProfilePopupContext);
   const { followerPopupOnOff, setFollowersPopupOnOff } = useContext(FollowersPopupContext)

   const [followers, setFollowers] = useState<followeInterface[]>();
   const [following, setFollowing] = useState<followeInterface[]>();

   const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);

   const getAllTheFollowers = async () => {
      const response = await getAllTheFollowersOfAPerticularUserApiCall(props._id!, loggedUser.token);
      setFollowers(response.data.data);
   }

   const getAllTheFollowings = async () => {
      const followingResponse = await getAllTheFollowingsOfAPerticularUserApiCall(props._id!, loggedUser.token);
      setFollowing(followingResponse.data.data);
   }

   const dispatch = useDispatch();

   const { followersAndFollowings } = useSelector((state: RootState) => state)
   if (followersAndFollowings.length === 1 && followersAndFollowings[0].user._id === "") {
      dispatch(resetFollowState());
   }

   useEffect(() => {
      getAllTheFollowers();
      getAllTheFollowings();
   }, [])

   const followersAndFollowingsReducFinalState = followers?.map(singleObject => {
      return {
         user: singleObject.user,
         followedUserId: singleObject.followedUserId
      }
   })
   const followersAndFollowingsReducSecondFinalState = following?.map(singleObject => {
      return {
         user: singleObject.user,
         followedUserId: singleObject.followedUserId
      }
   })

   console.log(followersAndFollowingsReducSecondFinalState, followersAndFollowingsReducFinalState)

   document.title = props.name?.toUpperCase()!;

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section className="bg-[#18eeb8] flex justify-between items-center shadow-md">
               <div className=" flex justify-evenly items-center  w-[40%]">
                  <div className="  w-[30%] flex justify-center items-center flex-col">
                     <div className=" flex justify-center items-center flex-col">
                        <div
                           onClick={() => setProfilePopupOnOff(!profilePopupOnOff)}
                           className="my-2"
                        >
                           <img
                              loading="lazy"
                              src={props.profilePic}
                              className="rounded-full w-[7rem] h-[7rem] object-cover text-center shadow-lg cursor-pointer"
                              alt="era user"
                           />
                        </div>
                        <span className="mb-2 lg:text-2xl text-xl font-semibold">
                           {capitalize(props.name!)}
                        </span>
                     </div>
                  </div>
                  <div className=" flex justify-center-start flex-col my-2 mt-2">
                     <div className="flex justify-between w-full">
                        <div className="followInfo flex flex-col justify-center items-center cursor-pointer">
                           <span className="font-bold text-xl">10</span>
                           <span className=" text-lg">Post</span>
                        </div>
                        <div
                           onClick={() => {
                              dispatch(addFollwersAndFollowings(followersAndFollowingsReducFinalState));
                              setFollowersPopupOnOff(!followerPopupOnOff)
                           }}
                           className="followInfo flex flex-col justify-center items-center mx-8 cursor-pointer">
                           <span className="font-bold text-xl">{followers?.length}</span>
                           <span className=" text-lg">Followers</span>
                        </div>
                        <div
                           onClick={() => {
                              dispatch(addFollwersAndFollowings(followersAndFollowingsReducSecondFinalState));
                              setFollowersPopupOnOff(!followerPopupOnOff)
                           }}
                           className="followInfo flex flex-col justify-center items-center cursor-pointer">
                           <span className="font-bold text-xl">{following?.length}</span>
                           <span className=" text-lg">
                              Followings
                           </span>
                        </div>
                     </div>
                     <div className="my-2">
                        <div className="userInfomation flex  w-[94%] py-2">
                           <span className="font-bold">Bio: </span>
                           <p> {props.bio}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className=" w-[20%] h-full grid place-content-center ">
                  {
                     loggedUser._id !== props._id ? (
                        <button
                           className="text-2xl text-white font-semibold cursor-pointer shadow-lg hover:bg-gray-900 bg-cyan-950 transi duration-200 p-2 rounded-md"
                        >
                           Follow
                        </button>
                     ) : ""
                  }
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default UserProfileHeader;
