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
} from "../contaxt";
import { user } from "../interfaces";

const Profile: React.FC = () => {
   const navigator = useNavigate();

   const [user, setUser] = useState<user[]>();
   const [loading, setLoading] = useState<boolean>(false)

   const { userId } = useParams();

   const getUserInformation = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);
      setLoading(true)
      const userResponse = await getSingleUserInformation(
         loggedUser.token,
         userId as string
      );
      setUser(userResponse.data.data);
      setLoading(false)
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
   const { editPostPopupOnOff } =
      useContext(EditPostPopupContext);
   return (
      <Fragment>
         {loading ? <LoaderSpinner /> : ""}
         <div className="flex flex-col">
            {profilePopupOnOff ? <ProfilePopup {...user![0]} /> : ""}
            {postCreatePopupOnOff ? <PostCreatePopupForm /> : ""}
            {singlePostPopupOnOff ? <SinglePostPopup /> : ""}
            {editPostPopupOnOff ? <EditPostPopup /> : ""}
            {/* ------------------  */}
            {user?.map((singleUserObject, index) => {
               return (
                  <Fragment key={index}>
                     <Suspense fallback={<LoaderSpinner />}>
                        <div>
                           <UserProfileHeader {...singleUserObject} />
                        </div>
                        <div className="flex  w-full h-[74vh] justify-between ">
                           <div className="lg:flex md:flex hidden w-[23%]">
                              <LeftSideBar />
                           </div>
                           <div className=" w-[90%]">
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
