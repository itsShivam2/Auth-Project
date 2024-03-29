import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

//we make a method in which we will the path of the local file as parameter.
//then we upload file.
//if successfully uploaded we unlink the file

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File has been uploaded on Cloudinary");
    response.url;
    return response;
  } catch (error) {
      fs.unlink(localFilePath); //remove the locally saved temporarary file as the upload operation got failed
      return null;
  }
};

export { uploadOnCloudinary };

          
