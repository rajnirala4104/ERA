import React, {
   Fragment,
   Suspense,
   useContext,
   useEffect,
   useState,
} from "react";
import { useParams } from "react-router-dom";
import { PostCard, ZeroPostIndicator } from ".";
import { getAllThePostOfAPerticulerUser } from "../api/services/postApiServices";
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

   const gettingAllThePosts = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);
      setUser(loggedUser);
      const { data } = await getAllThePostOfAPerticulerUser(
         userId!,
         loggedUser.token
      );
      setAllPosts(data.data);
   };

   useEffect(() => {
      gettingAllThePosts();
   }, []);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <section className="w-full h-full">
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

               <div className="postContainer w-[100%] h-[100%] overflow-y-auto">
                  {allPosts?.length === 0 ? (
                     <div className="w-full h-full grid place-items-center ">
                        <ZeroPostIndicator />
                     </div>
                  ) : (
                     allPosts?.map((singlePostObject) => (
                        <div className="w-[100%] border border-black flex flex-row ">
                           <PostCard {...singlePostObject} />
                        </div>
                     ))
                  )}
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};

export default UserProfilePostContainer;
