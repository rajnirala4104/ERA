import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { LoaderSpinner } from "./components";
import {
   EditPostPopupContext,
   LoginDesignContext,
   PostCreatePopupContext,
   ProfilePopupContext,
   SinglePostPopupContext,
} from "./contaxt";
import { _ROUTER } from "./router";

function App() {
   const [loginDesign, setLoginDesign] = useState<boolean>(true);
   const [profilePopupOnOff, setProfilePopupOnOff] = useState<boolean>(false);
   const [editPostPopupOnOff, setEditPostPopupOnOff] = useState<boolean>(false);
   const [postCreatePopupOnOff, setPostCreatePopupOnOff] =
      useState<boolean>(false);
   const [singlePostPopupOnOff, setSinglePostPopupOnOff] =
      useState<boolean>(false);

   return (
      <Fragment>
         <Suspense fallback={<LoaderSpinner />}>
            <LoginDesignContext.Provider
               value={{ loginDesign, setLoginDesign }}
            >
               <ProfilePopupContext.Provider
                  value={{ profilePopupOnOff, setProfilePopupOnOff }}
               >
                  <EditPostPopupContext.Provider
                     value={{ editPostPopupOnOff, setEditPostPopupOnOff }}
                  >
                     <PostCreatePopupContext.Provider
                        value={{
                           postCreatePopupOnOff,
                           setPostCreatePopupOnOff,
                        }}
                     >
                        <SinglePostPopupContext.Provider
                           value={{
                              singlePostPopupOnOff,
                              setSinglePostPopupOnOff,
                           }}
                        >
                           <RouterProvider router={_ROUTER} />
                        </SinglePostPopupContext.Provider>
                     </PostCreatePopupContext.Provider>
                  </EditPostPopupContext.Provider>
               </ProfilePopupContext.Provider>
            </LoginDesignContext.Provider>
         </Suspense>
      </Fragment>
   );
}

export default App;
