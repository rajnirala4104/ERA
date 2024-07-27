import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { LoaderSpinner } from "./components";
import {
   EditPostPopupContext,
   EditUserProfilePopupContext,
   FollowersPopupContext,
   LoginDesignContext,
   PostCreatePopupContext,
   ProfilePopupContext,
   SinglePostPopupContext,
} from "./contaxt";
import { _ROUTER } from "./router";

function App() {
   const [editUserProfilePopupOnOff, setEditUserProfilePopupOnOff] = useState<boolean>(false);
   const [postCreatePopupOnOff, setPostCreatePopupOnOff] = useState<boolean>(false);
   const [singlePostPopupOnOff, setSinglePostPopupOnOff] = useState<boolean>(false);
   const [editPostPopupOnOff, setEditPostPopupOnOff] = useState<boolean>(false);
   const [followerPopupOnOff, setFollowersPopupOnOff] = useState<boolean>(false);
   const [profilePopupOnOff, setProfilePopupOnOff] = useState<boolean>(false);
   const [loginDesign, setLoginDesign] = useState<boolean>(true);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <LoginDesignContext.Provider value={{ loginDesign, setLoginDesign }}>
               <ProfilePopupContext.Provider value={{ profilePopupOnOff, setProfilePopupOnOff }}>
                  <EditPostPopupContext.Provider value={{ editPostPopupOnOff, setEditPostPopupOnOff }} >
                     <EditUserProfilePopupContext.Provider value={{ editUserProfilePopupOnOff, setEditUserProfilePopupOnOff }}>
                        <PostCreatePopupContext.Provider value={{ postCreatePopupOnOff, setPostCreatePopupOnOff }} >
                           <SinglePostPopupContext.Provider value={{ singlePostPopupOnOff, setSinglePostPopupOnOff }} >
                              <FollowersPopupContext.Provider value={{ followerPopupOnOff, setFollowersPopupOnOff }} >
                                 <RouterProvider router={_ROUTER} />
                              </FollowersPopupContext.Provider>
                           </SinglePostPopupContext.Provider>
                        </PostCreatePopupContext.Provider>
                     </EditUserProfilePopupContext.Provider>
                  </EditPostPopupContext.Provider>
               </ProfilePopupContext.Provider>
            </LoginDesignContext.Provider>
         </Suspense >
      </Fragment >
   );
}

export default App;
