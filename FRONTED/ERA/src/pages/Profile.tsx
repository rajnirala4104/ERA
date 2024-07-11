import React, {
   Fragment,
   Suspense,
   useContext,
   useEffect,
   useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserInformation } from "../api/services/usersServices";
import {
   EditPostPopup,
   EditUserProfilePopup,
   FollowersPopup,
   LeftSideBar,
   LoaderSpinner,
   PostCreatePopupForm,
   ProfilePopup,
   SinglePostPopup,
   UserProfileHeader,
   UserProfilePostContainer,
} from "../components";
import {
   EditPostPopupContext,
   PostCreatePopupContext,
   ProfilePopupContext,
   SinglePostPopupContext,
   FollowersPopupContext,
   EditUserProfilePopupContext,
} from "../contaxt";
import { user } from "../interfaces";

// This is the Profile component. It is responsible for rendering the user's profile page.
const Profile: React.FC = () => {
   // Initialize the navigate function from react-router-dom to navigate between pages.
   const navigator = useNavigate();

   // Initialize the state variables for the user information and loading status.
   const [user, setUser] = useState<user[]>();
   const [loading, setLoading] = useState<boolean>(false)

   // Get the userId parameter from the URL.
   const { userId } = useParams();
   // Get the logged user's information from localStorage.
   const LOGGED_USER = JSON.parse(localStorage.getItem("userInfo") as string);

   // This function is responsible for fetching the user information from the server.
   const getUserInformation = async () => {
      // Set the loading status to true.
      setLoading(true)
      // Send a request to the server to get the user information.
      const userResponse = await getSingleUserInformation(
         LOGGED_USER.token,
         userId as string
      );
      // Set the user state variable with the response data.
      setUser(userResponse.data.data);
      // Set the loading status to false.
      setLoading(false)
   };

   // This effect runs when the component is mounted. It fetches the user information.
   useEffect(() => {
      getUserInformation();
   }, []);

   // This effect runs when the component is mounted. It checks if the user is logged in.
   useEffect(() => {
      // Get the logged user's information from localStorage.
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      // If there is no user information, navigate to the account page.
      if (!user) navigator("/account");
   }, []);

   // Get the state variables for the popup components.
   const { postCreatePopupOnOff } = useContext(PostCreatePopupContext);
   const { singlePostPopupOnOff } = useContext(SinglePostPopupContext);
   const { editPostPopupOnOff } = useContext(EditPostPopupContext);
   const { followerPopupOnOff } = useContext(FollowersPopupContext)
   const { profilePopupOnOff } = useContext(ProfilePopupContext);
   const { editUserProfilePopupOnOff } = useContext(EditUserProfilePopupContext)

   // Render the Profile component.
   return (
      <Fragment>
         {/* If the loading status is true, display the LoaderSpinner component. */}
         {loading ? <LoaderSpinner /> : ""}
         <div className="flex flex-col">
            {/* If the profilePopupOnOff state variable is true, display the ProfilePopup component. */}
            {profilePopupOnOff ? <ProfilePopup {...user![0]} /> : ""}
            {/* If the postCreatePopupOnOff state variable is true, display the PostCreatePopupForm component. */}
            {postCreatePopupOnOff ? <PostCreatePopupForm /> : ""}
            {/* If the singlePostPopupOnOff state variable is true, display the SinglePostPopup component. */}
            {singlePostPopupOnOff ? <SinglePostPopup /> : ""}
            {/* If the editPostPopupOnOff state variable is true, display the EditPostPopup component. */}
            {editPostPopupOnOff ? <EditPostPopup /> : ""}
            {/* If the followerPopupOnOff state variable is true, display the FollowersPopup component. */}
            {followerPopupOnOff ? <FollowersPopup /> : ""}
            {/* If the editUserProfilePopupOnOff state variable is true, display the EditUserProfile component. */}
            {editUserProfilePopupOnOff ? <EditUserProfilePopup {...LOGGED_USER} /> : ""}
            {/* ------------------  */}
            {/* Map over the user state variable and display the UserProfileHeader and UserProfilePostContainer components. */}
            {user?.map((singleUserObject, index) => {
               return (
                  <Fragment key={index}>
                     {/* Wrap the UserProfileHeader and UserProfilePostContainer components with Suspense to handle lazy loading. */}
                     <Suspense fallback={<LoaderSpinner />}>
                        <div>
                           {/* Display the UserProfileHeader component, passing the singleUserObject as props. */}
                           <UserProfileHeader {...singleUserObject} />
                        </div>
                        <div className="flex  w-full h-[74vh] justify-between ">
                           <div className="lg:flex md:flex w-[23%]">
                              {/* Display the LeftSideBar component. */}
                              <LeftSideBar />
                           </div>
                           <div className=" w-[90%]">
                              {/* Display the UserProfilePostContainer component. */}
                              <UserProfilePostContainer />
                           </div>
                        </div>
                     </Suspense>
                  </Fragment>
               );
            })}
         </div>
      </Fragment>
   );
};

export default Profile;
