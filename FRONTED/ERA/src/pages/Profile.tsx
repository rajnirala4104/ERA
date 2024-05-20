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
   LeftSideBar,
   LoaderSpinner,
   PostCreatePopupForm,
   ProfilePopup,
   SinglePostPopup,
   UserProfileHeader,
   UserProfilePostContainer,
} from "../components";
import {
   PostCreatePopupContext,
   ProfilePopupContext,
   SinglePostPopupContext,
} from "../contaxt";
import { user } from "../interfaces";

const Profile: React.FC = () => {
   const navigator = useNavigate();

   const [user, setUser] = useState<user[]>();

   const { userId } = useParams();

   const getUserInformation = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);
      const userResponse = await getSingleUserInformation(
         loggedUser.token,
         userId as string
      );
      setUser(userResponse.data.data);
   };

   useEffect(() => {
      getUserInformation();
   }, []);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo") as string);
      if (!user) navigator("/account");
   }, []);

   const { profilePopupOnOff } = useContext(ProfilePopupContext);
   const { postCreatePopupOnOff } = useContext(PostCreatePopupContext);
   const { singlePostPopupOnOff } = useContext(SinglePostPopupContext);
   return (
      <Fragment>
         <div className="flex flex-col">
            {profilePopupOnOff ? <ProfilePopup {...user![0]} /> : ""}
            {postCreatePopupOnOff ? <PostCreatePopupForm /> : ""}
            {singlePostPopupOnOff ? <SinglePostPopup /> : ""}
            {/* ------------------  */}
            {user?.map((singleUserObject, index) => {
               return (
                  <Fragment key={index}>
                     <Suspense fallback={<LoaderSpinner />}>
                        <div>
                           <UserProfileHeader {...singleUserObject} />
                        </div>
                        <div className="flex  w-full h-[74vh] justify-between ">
                           <div className="lg:flex md:flex hidden w-[28%]">
                              <LeftSideBar />
                           </div>
                           <div className=" border border-red-500 w-[72%]">
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
