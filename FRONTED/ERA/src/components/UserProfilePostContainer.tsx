import React, {
   Fragment,
   Suspense,
   useContext,
   useEffect,
   useState,
} from "react";
import { useParams } from "react-router-dom";
import { ProfilePagePostCard, ZeroPostIndicator } from ".";
import { getAllThePostOfAPerticulerUser } from "../api/services/postApiServices";
import { getAllTheThoughtPostsOfAPerticulerUser } from "../api/services/thoughtPostServices";
import { PostCreatePopupContext } from "../contaxt";
import { PlusIcon } from "../icons";
import { postInterface, user } from "../interfaces";
import { LoaderSpinner } from "./LoaderSpinner";

const UserProfilePostContainer: React.FC = () => {
   const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(
      PostCreatePopupContext
   );

   const { userId } = useParams();
   const [allPosts, setAllPosts] = useState<postInterface[]>();
   const [user, setUser] = useState<user>();
   const [loading, setLoading] = useState<boolean>(false)

   const gettingAllThePosts = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);
      setUser(loggedUser);
      setLoading(true)
      const { data } = await getAllThePostOfAPerticulerUser(
         userId!,
         loggedUser.token
      );
      const thoughtPostData = await getAllTheThoughtPostsOfAPerticulerUser(
         userId!,
         loggedUser.token
      );
      const bothPosts = [...data.data, ...thoughtPostData.data.data];
      setAllPosts(bothPosts);
      setLoading(false)
   };

   useEffect(() => {
      gettingAllThePosts();
   }, []);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section className="w-full h-full">
               {loading ? <LoaderSpinner /> : ""}
               {/* ---------- create Post button --------- */}
               {user?._id === userId ? (
                  <div
                     onClick={() =>
                        setPostCreatePopupOnOff(!postCreatePopupOnOff)
                     }
                     className="appPostBtn absolute top-[10%] right-[10%] cursor-pointer"
                  >
                     <PlusIcon classess="text-4xl hover:text-slate-800" />
                  </div>
               ) : (
                  ""
               )}

               {/* --------- post container ------------ */}
               <div className="postContainer w-[100%] h-[100%] overflow-y-auto flex flex-wrap p-2 justify-start items-start ">
                  {allPosts?.length === 0 ? (
                     <div className="w-full h-full grid place-items-center ">
                        <ZeroPostIndicator />
                     </div>
                  ) : (
                     // ----- rendering all the post ------
                     allPosts?.map((singlePostObject, index) => (
                        <Fragment key={index}>
                           <ProfilePagePostCard {...singlePostObject} />
                        </Fragment>
                     ))
                  )}
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default UserProfilePostContainer;
