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

import { useSelector } from "react-redux";
import { SinglePostPopup } from ".";
import { getAllThePosts } from "../api/services/postApiServices";
import { getAllThoughtPost } from "../api/services/thoughtPostServices";
import { SinglePostPopupContext } from "../contaxt";
import "../css/postContainer.css";
import { postInterface } from "../interfaces";
import { RootState } from "../redux/store";
import { shuffleArray } from "../utils";

const PostContainer: React.FC = () => {
   const [allPost, setAllPost] = useState<postInterface[]>([]);

   const getAllThePost = async () => {
      const data = JSON.parse(localStorage.getItem("userInfo") as string);
      const postResponse = await getAllThePosts(data.token);
      const thougthPostResponse = await getAllThoughtPost(data.token);
      const newArrayOfMixPosts = postResponse.data.data.concat(
         thougthPostResponse.data.data
      );
      setAllPost(shuffleArray(newArrayOfMixPosts));
   };

   const { singlePostPopupOnOff } = useContext(SinglePostPopupContext);
   const { post } = useSelector((state: RootState) => state);
   console.log(post);

   useEffect(() => {
      getAllThePost();
   }, []);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            {singlePostPopupOnOff ? <SinglePostPopup /> : ""}
            <div className=" w-[90%] mx-auto h-[89vh] overflow-y-auto">
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
