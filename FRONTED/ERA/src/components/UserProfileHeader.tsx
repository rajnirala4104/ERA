import React, {
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProfilePopupContext, FollowersPopupContext } from "../contaxt";
import { followeInterface, user } from "../interfaces";
import { LoaderSpinner } from "./LoaderSpinner";
import {
  getAllTheFollowersOfAPerticularUserApiCall,
  getAllTheFollowingsOfAPerticularUserApiCall,
} from "../api/services/followApiServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addFollwersAndFollowings,
  resetFollowState,
} from "../redux/states/usersFollowersAndFollowings";
import { capitalize } from "../utils";

// UserProfileHeader is a React functional component that renders the header section of a user's profile page.
// It receives a user object as a prop and uses it to display the user's profile information.
const UserProfileHeader: React.FC<user> = (props) => {
  // The profilePopupOnOff and setProfilePopupOnOff variables are used to control the visibility of a profile popup.
  const { profilePopupOnOff, setProfilePopupOnOff } =
    useContext(ProfilePopupContext);
  // The followerPopupOnOff and setFollowersPopupOnOff variables are used to control the visibility of a follower popup.
  const { followerPopupOnOff, setFollowersPopupOnOff } = useContext(
    FollowersPopupContext
  );

  // The followers and following variables are used to store the list of followers and followings for the user.
  const [followers, setFollowers] = useState<followeInterface[]>();
  const [following, setFollowing] = useState<followeInterface[]>();

  // The loggedUser variable is used to store the user information of the logged-in user.
  const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);

  // The getAllTheFollowers function is used to fetch the list of followers for the user.
  const getAllTheFollowers = async () => {
    const response = await getAllTheFollowersOfAPerticularUserApiCall(
      props._id!,
      loggedUser.token
    );
    setFollowers(response.data.data);
  };

  // The getAllTheFollowings function is used to fetch the list of followings for the user.
  const getAllTheFollowings = async () => {
    const followingResponse = await getAllTheFollowingsOfAPerticularUserApiCall(
      props._id!,
      loggedUser.token
    );
    setFollowing(followingResponse.data.data);
  };

  // The dispatch variable is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // The followersAndFollowings variable is used to store the list of followers and followings for the user from the Redux store.
  const { followersAndFollowings } = useSelector((state: RootState) => state);
  // If there is only one follower or following and the user ID is empty, reset the follow state in the Redux store.
  if (Object.keys(followersAndFollowings[0].user).length === 0 && Object.keys(followersAndFollowings[0].followedUserId).length === 0) {
    dispatch(resetFollowState());
  }

  // Use the useEffect hook to fetch the list of followers and followings for the user when the component mounts.
  useEffect(() => {
    getAllTheFollowers();
    getAllTheFollowings();
  }, []);

  // The followersAndFollowingsReducFinalState variable is used to store the list of followers and followings for the user in a specific format.
  const followersAndFollowingsReducFinalState = followers?.map(
    (singleObject) => {
      return {
        user: singleObject.user,
        followedUserId: singleObject.followedUserId,
      };
    }
  );
  // The followersAndFollowingsReducSecondFinalState variable is used to store the list of followers and followings for the user in a different format.
  const followersAndFollowingsReducSecondFinalState = following?.map(
    (singleObject) => {
      return {
        user: singleObject.user,
        followedUserId: singleObject.followedUserId,
      };
    }
  );

  // Set the title of the page to the name of the user in uppercase.
  document.title = props.name?.toUpperCase()!;

  // Return the JSX for the header section of the user's profile page.
  return (
    <Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <section className="bg-[#18eeb8] flex justify-between items-center shadow-md">
          <div className=" flex justify-evenly items-center  w-[40%]">
            <div className=" flex justify-center items-center flex-col">
              <div className=" flex justify-center items-center flex-col">
                {/* Render an image of the user's profile picture and display the user's name. */}
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
                {/* Render the number of posts the user has made and allow the user to view their followers. */}
                <div className="followInfo flex flex-col justify-center items-center cursor-pointer">
                  <span className="font-bold text-xl">10</span>
                  <span className=" text-lg">Post</span>
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      addFollwersAndFollowings(
                        followersAndFollowingsReducFinalState
                      )
                    );
                    setFollowersPopupOnOff(!followerPopupOnOff);
                  }}
                  className="followInfo flex flex-col justify-center items-center mx-8 cursor-pointer"
                >
                  <span className="font-bold text-xl">{followers?.length}</span>
                  <span className=" text-lg">Followers</span>
                </div>
                {/* Render the number of users the user is following and allow the user to view their followings. */}
                <div
                  onClick={() => {
                    dispatch(
                      addFollwersAndFollowings(
                        followersAndFollowingsReducSecondFinalState
                      )
                    );
                    setFollowersPopupOnOff(!followerPopupOnOff);
                  }}
                  className="followInfo flex flex-col justify-center items-center cursor-pointer"
                >
                  <span className="font-bold text-xl">{following?.length}</span>
                  <span className=" text-lg">Followings</span>
                </div>
              </div>
              {/* Render the user's bio. */}
              <div className="my-2">
                <div className="userInfomation flex  w-[94%] py-2">
                  <span className="font-bold">Bio: </span>
                  <p> {props.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[20%] h-full grid place-content-center ">
            {/* If the logged-in user is not the same as the user being displayed, render a "Follow" button. */}
            {loggedUser._id !== props._id ? (
              <button className="text-2xl text-white font-semibold cursor-pointer shadow-lg hover:bg-gray-900 bg-cyan-950 transi duration-200 p-2 rounded-md">
                Follow
              </button>
            ) : (
              ""
            )}
          </div>
        </section>
      </Suspense>
    </Fragment>
  );
};

export default UserProfileHeader;
