import React, { useContext, useState } from 'react'
import { user } from '../interfaces'
import { CloseIcon } from '../icons'
import { EditUserProfilePopupContext } from '../contaxt'
import { updateUserProfileApiCall } from '../api/services/usersServices'

const EditUserProfilePopup: React.FC<user> = ({ _id, token, bio, email, name, profilePic }) => {

   const { editUserProfilePopupOnOff, setEditUserProfilePopupOnOff } = useContext(EditUserProfilePopupContext);

   const [profilePicture, setProfilePicture] = useState<string>(profilePic!);
   const [loading, setLoading] = useState<boolean>(false);
   const [userName, setUserName] = useState<string>(name!);
   const [userBio, setUserBio] = useState<string>(bio!);

   // This function handles the uploading of a profile picture to Cloudinary.
   // It takes in an event object from an HTML input element of type file.
   const postDetails = (pics: React.ChangeEvent<HTMLInputElement>) => {
      // Extract the first file from the input element.
      const fileObject = pics.target.files![0];

      // If there is no file, display an alert and return.
      if (fileObject === undefined) {
         alert("Oops!! image error");
         return;
      }

      setLoading(true);
      // Check if the file type is either 'image/jpeg' or 'image/png'.
      if (fileObject.type === "image/jpeg" || fileObject.type === "image/png") {
         // Create a new FormData object to hold the file data.
         const data = new FormData();

         // Append the file to the FormData object.
         data.append('file', fileObject);

         // Append the upload preset and cloud name to the FormData object.
         // The upload preset and cloud name are specific to our Cloudinary account.
         data.append('upload_preset', 'ERA_910');
         data.append("cloud_name", "eracloud");

         // Send a POST request to Cloudinary's image upload API with the FormData.
         fetch('https://api.cloudinary.com/v1_1/eracloud/image/upload', {
            method: "POST",
            body: data
         })
            // Parse the response as JSON.
            .then((res) => res.json())
            // Update the profilePic state with the URL of the uploaded image.
            .then((data) => {
               setProfilePicture(data.url.toString());
            });
      }
      setLoading(false)
   }

   const updateUserProfile = async () => {
      const response = await updateUserProfileApiCall(token!, _id!, { name: userName, bio: userBio, profilePic: profilePicture });

      // Check if the API call was successful (status code 200)
      if (response.status === 200) {
         // If the update was successful, close the popup and reload the page

         // Update the state of editUserProfilePopupOnOff to flip its value
         // This will cause the popup to close
         setEditUserProfilePopupOnOff(!editUserProfilePopupOnOff);

         // re-storing the localStrogar with updated data
         localStorage.setItem("userInfo", JSON.stringify({
            _id: _id,
            token: token,
            profilePic: profilePicture,
            name: userName,
            bio: userBio,
            email: email
         }))

         // Reload the page to reflect the changes made by the API call
         // This is necessary because the state of the component is not automatically updated
         // with the new data from the API call
         window.location.reload();
      }
   }

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
                  {loading ? "loading.." : ""}
                  <img src={profilePicture} className='w-[50%] rounded-md shadow-xl' alt="ERA" />
                  <div>
                     <input type="file" name="file" onChange={postDetails} />
                  </div>
               </div>
               <div className="w-[50%] px-4">
                  <div className="flex flex-col">
                     <input type='text' placeholder={userName} className=" text-5xl placeholder:text-black font-semibold my-2 outline-none cursor-pointer focus:border-b border-black" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
                     <div className='flex flex-col cursor-not-allowed justify-center items-start w-[40%]'>
                        <span className="font-mono my-2">{email}</span>
                        <span className='text-red-500 font-bold text-[10px] -mt-3'>You can't change your email</span>
                     </div>
                     <hr />
                     <textarea value={userBio} onChange={(e) => setUserBio(e.target.value)} rows={12} className="my-2 text-[15px] outline-none border focus:border-black bg-gray-200 p-2 rounded-md"></textarea>
                  </div>
                  <div>
                     <button onClick={updateUserProfile} className="w-full p-2 bg-black text-white rounded-md hover:bg-slate-900 shadow-lg">Update</button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default EditUserProfilePopup