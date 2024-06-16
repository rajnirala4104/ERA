import React, {
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { EditUserProfilePopupContext, ProfilePopupContext } from "../contaxt";
import { CloseIcon, EditIcon, LogoutIcon } from "../icons";
import { user } from "../interfaces";
import { LoaderSpinner } from "./LoaderSpinner";

const ProfilePopup: React.FC<user> = (props) => {
  const [user, setUser] = useState<user>();

  const { profilePopupOnOff, setProfilePopupOnOff } = useContext(ProfilePopupContext);
  const { editUserProfilePopupOnOff, setEditUserProfilePopupOnOff } = useContext(EditUserProfilePopupContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") as string);
    setUser(user);
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<LoaderSpinner />}>
        <section
          style={{ background: "rgba(65,65,65,0.35)" }}
          className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 bg-black z-10"
        >
          <div className="centerContainer flex w-[60%] h-[80%] justify-between relative items-center bg-white rounded-md">
            <span
              onClick={() => setProfilePopupOnOff(!profilePopupOnOff)}
              className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer"
            >
              {<CloseIcon classess="" />}
            </span>

            {user?._id === props._id ? (
              <span
                onClick={() => {
                  setProfilePopupOnOff(!profilePopupOnOff)
                  setEditUserProfilePopupOnOff(!editUserProfilePopupOnOff)
                }}
                className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[6%] cursor-pointer"
              >
                {<EditIcon />}
              </span>
            ) : (
              ""
            )}

            {user?._id === props._id ? (
              <span
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[10%] cursor-pointer"
              >
                {<LogoutIcon />}
              </span>
            ) : (
              ""
            )}

            <div
              style={{
                background: `url(${props.profilePic}) center center/cover`,
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
              className="shadow-md w-[50%] flex justify-center items-center h-full"
            ></div>
            <div className="w-[50%] px-4">
              <div className="flex flex-col">
                <span className="text-5xl font-semibold">
                  {props.name!.toLocaleUpperCase()}
                </span>
                <span className="font-mono my-2">{props.email}</span>
                <hr />
                <p className="my-2 text-[15px]">{props.bio}</p>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </Fragment>
  );
};

export default ProfilePopup;
