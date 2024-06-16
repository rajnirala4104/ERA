import React, { useContext } from 'react'
import { user } from '../interfaces'
import { CloseIcon } from '../icons'
import { EditUserProfilePopupContext } from '../contaxt'

const EditUserProfilePopup: React.FC<user> = ({ _id, bio, email, name, profilePic }) => {

   const { editUserProfilePopupOnOff, setEditUserProfilePopupOnOff } = useContext(EditUserProfilePopupContext)


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
            <div className="container">
               {name}
            </div>
         </div>
      </section>
   )
}

export default EditUserProfilePopup