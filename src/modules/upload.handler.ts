import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: "dts5hk4pn",
  api_key: "148173892991721",
  api_secret: "6UnzjuvClIqDrBLwul0XcWr96FY",
});

async function uploadPhoto(file: Express.Multer.File) {
  const response = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    );

    uploadStream.end(file.buffer);
  });

  return { url: response.secure_url, id: response.public_id };
}

export { uploadPhoto, upload };
