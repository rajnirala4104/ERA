import React, {
   Fragment,
   Suspense,
   lazy,
   useContext,
   useEffect,
   useState,
} from "react";
import { LoaderSpinner } from "./LoaderSpinner";
const PostCard = lazy(() => import("./PostCard"));

import { EditPostPopup, SinglePostPopup } from ".";
import { getAllThePosts } from "../api/services/postApiServices";
import { getAllThoughtPost } from "../api/services/thoughtPostServices";
import { EditPostPopupContext, SinglePostPopupContext } from "../contaxt";
import "../css/postContainer.css";
import { postInterface } from "../interfaces";
import { shuffleArray } from "../utils";

// This is a functional component for the PostContainer component.
// It is responsible for fetching all the posts and thought posts from the server
// and rendering them in a shuffled order.
const PostContainer: React.FC = () => {
   // State hook to store all the posts and thought posts received from the server
   const [allPost, setAllPost] = useState<postInterface[]>([]);
   // State hook to track the loading state of the component
   const [loading, setLoading] = useState<boolean>(false)

   // Function to fetch all the posts and thought posts from the server
   // and update the state with the fetched data
   const getAllThePost = async () => {
      // Get the user information from the local storage
      const data = JSON.parse(localStorage.getItem("userInfo") as string);
      // Set the loading state to true
      setLoading(true)
      // Fetch all the posts from the server
      const postResponse = await getAllThePosts(data.token);
      // Fetch all the thought posts from the server
      const thougthPostResponse = await getAllThoughtPost(data.token);
      // Concatenate the fetched posts and thought posts and shuffle the combined array
      const newArrayOfMixPosts = postResponse.data.data.concat(
         thougthPostResponse.data.data
      );
      // Update the state with the shuffled array
      setAllPost(shuffleArray(newArrayOfMixPosts));
      // Set the loading state to false
      setLoading(false)
   };

   // Get the values of the singlePostPopupOnOff and editPostPopupOnOff from the context
   const { singlePostPopupOnOff } = useContext(SinglePostPopupContext);
   const { editPostPopupOnOff } = useContext(EditPostPopupContext);

   // Use the useEffect hook to call the getAllThePost function when the component mounts
   useEffect(() => {
      getAllThePost();
   }, []);

   // Render the component
   return (
      <Fragment>
         {/* Use the Suspense component with a fallback loader */}
         <Suspense fallback={<LoaderSpinner />}>
            {/* Render the EditPostPopup component if editPostPopupOnOff is true */}
            {editPostPopupOnOff ? <EditPostPopup /> : ""}
            {/* Render the SinglePostPopup component if singlePostPopupOnOff is true */}
            {singlePostPopupOnOff ? <SinglePostPopup /> : ""}
            {/* Render the LoaderSpinner component if loading is true */}
            {loading ? <LoaderSpinner /> : ""}
            {/* Render a div to contain the posts */}
            <div className=" w-[94%] mx-auto h-[92vh] overflow-y-auto">
               {/* Render a PostCard component for each post in the allPost array */}
               {allPost.map((singplePostObject, index) => (
                  <Fragment key={index}>
                     <PostCard {...singplePostObject} />
                  </Fragment>
               ))}
            </div>
         </Suspense>
      </Fragment>
   );
};

export default PostContainer;
