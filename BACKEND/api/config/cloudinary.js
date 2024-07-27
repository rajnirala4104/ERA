require('dotenv').config();
const { v2: cloudinary } = require('cloudinary')
const fs = require('fs')

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
})


// This function is responsible for uploading a file to Cloudinary.
// It takes in a file parameter which is the path to the file to be uploaded.
// It returns a Promise that resolves to the response object from Cloudinary's API.
const uploadOnCloudinary = async (file) => {
   try {
      // If no file is provided, return null.
      if (!file) return null

      // Use Cloudinary's uploader to upload the file.
      // The resource_type is set to "auto" to automatically detect the file type.
      const response = await cloudinary.uploader.upload(file, {
         resource_type: "auto"
      })

      // Log the URL of the uploaded file.
      console.log(response.url);

      // Return the response object from Cloudinary's API.
      return response

   } catch (error) {
      // If an error occurs during the upload process, delete the local copy of the file.
      fs.unlinkSync(file)

      // Return null to indicate that the upload was unsuccessful.
      return null
   }
}

module.exports = { uploadOnCloudinary }