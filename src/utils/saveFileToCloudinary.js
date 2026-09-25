import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveFileToCloudinary(
  buffer,
  userId,
  folderName = 'avatars',
  imageWidth = 500,
  imageHeight = 500,
) {
  const options = {
    folder: `relax-map/${folderName}`,
    public_id: `${folderName}-${userId}`,
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
    transformation: [
      {
        width: imageWidth,
        height: imageHeight,
        crop: 'fill',
        gravity: 'auto',
      },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadstream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    uploadstream.end(buffer);
  });
}

export async function saveAvatarToCloudinary(buffer, userId) {
  return saveFileToCloudinary(buffer, userId);
}

export async function saveLocationPhotoToCloudinary(buffer, userId) {
  return saveFileToCloudinary(buffer, userId, 'locations', 750, 500);
}
