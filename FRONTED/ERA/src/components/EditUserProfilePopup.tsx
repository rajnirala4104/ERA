import React, { useContext, useState } from 'react'
import { user } from '../interfaces'
import { CloseIcon } from '../icons'
import { EditUserProfilePopupContext } from '../contaxt'

const EditUserProfilePopup: React.FC<user> = ({ _id, bio, email, name, profilePic }) => {

   const { editUserProfilePopupOnOff, setEditUserProfilePopupOnOff } = useContext(EditUserProfilePopupContext);

   const [oldProfilePic, setOldProfilePic] = useState<string>(profilePic!);




   return (
      <section
         style={{ background: "rgba(65,65,65,0.35)" }}
         className="w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 bg-black z-10"
      >
         <div className="centerContainer flex w-[60%] h-[80%] justify-between relative items-center bg-white rounded-md">
            <span
               onClick={() => setEditUserProfilePopupOnOff(!editUserProfilePopupOnOff)}
               className="text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer"
            >
               {<CloseIcon classess="" />}
            </span>
            <div className="w-full h-full flex justify-center items-center">
               <div
                  style={{
                     borderTopRightRadius: "20px",
                     borderBottomRightRadius: "20px",
                  }}
                  className="shadow-md w-[50%] flex flex-col justify-evenly items-center h-full"
               >
                  <img src={oldProfilePic} className='w-[50%] rounded-md' alt="ERA" />
                  <div>
                     <input type="file" name="file" className="" />
                  </div>
               </div>
               <div className="w-[50%] px-4">
                  <div className="flex flex-col">
                     <span className="text-5xl font-semibold">
                        {name!.toLocaleUpperCase()}
                     </span>
                     <span className="font-mono my-2">{email}</span>
                     <hr />
                     <p className="my-2 text-[15px]">{bio}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default EditUserProfilePopup