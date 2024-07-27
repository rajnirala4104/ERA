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

// This is a functional component for the UserProfilePostContainer. 
// It handles the display of all the posts of a perticular user.
const UserProfilePostContainer: React.FC = () => {
   // Getting the postCreatePopupOnOff state from the PostCreatePopupContext
   const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(
      PostCreatePopupContext
   );

   // Getting the userId from the URL params
   const { userId } = useParams();

   // State hooks to store the allPosts and user data
   const [allPosts, setAllPosts] = useState<postInterface[]>();
   const [user, setUser] = useState<user>();

   // State hook to control the loading state
   const [loading, setLoading] = useState<boolean>(false)

   // Function to fetch all the posts of a perticular user
   const gettingAllThePosts = async () => {
      // Getting the logged user info from the local storage
      const loggedUser = JSON.parse(localStorage.getItem("userInfo") as string);

      // Setting the user state
      setUser(loggedUser);

      // Setting the loading state to true
      setLoading(true)

      // Fetching all the perticular user's posts
      const { data } = await getAllThePostOfAPerticulerUser(
         userId!,
         loggedUser.token
      );

      // Fetching all the perticular user's thought posts
      const thoughtPostData = await getAllTheThoughtPostsOfAPerticulerUser(
         userId!,
         loggedUser.token
      );

      // Combining both the posts and thought posts into one array
      const bothPosts = [...data.data, ...thoughtPostData.data.data];

      // Setting the allPosts state with the combined posts
      setAllPosts(bothPosts);

      // Setting the loading state to false
      setLoading(false)
   };

   // useEffect hook to call the gettingAllThePosts function when the component mounts
   useEffect(() => {
      gettingAllThePosts();
   }, []);

   // Returning the JSX for the UserProfilePostContainer
   return (
      <Fragment>
         {/* Suspense component to handle the loading state */}
         <Suspense fallback={<LoaderSpinner />}>
            <section className="w-full h-full border border-black flex justify-center items-center">
               {/* Conditionally rendering the loading spinner */}
               {loading ? <LoaderSpinner /> : ""}

               {/* Conditionally rendering the create post button */}
               {user?._id === userId ? (
                  <div
                     onClick={() =>
                        setPostCreatePopupOnOff(!postCreatePopupOnOff)
                     }
                     className="appPostBtn absolute top-[90%] right-[82%] cursor-pointer"
                  >
                     <PlusIcon classess="text-4xl hover:text-white text-green-300" />
                  </div>
               ) : (
                  ""
               )}

               {/* Container for the posts */}
               <div className="postContainer w-[100%] h-[100%] overflow-y-auto flex flex-wrap p-2 justify-center lg:justify-start lg:items-start items-center ">
                  {/* Conditionally rendering the zero post indicator */}
                  {allPosts?.length === 0 ? (
                     <div className="w-full h-full grid place-items-center ">
                        <ZeroPostIndicator />
                     </div>
                  ) : (
                     // Mapping over the allPosts array to render the posts
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
