import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveFileToCloudinary({
  buffer,
  folderName = 'avatars',
  imageWidth = 500,
  imageHeight = 500,
  publicId,
}) {
  const options = {
    folder: `relax-map/${folderName}`,
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

  if (publicId) {
    options.public_id = publicId;
  }

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
  return saveFileToCloudinary({ buffer, publicId: userId });
}

export async function saveLocationPhotoToCloudinary(buffer) {
  return saveFileToCloudinary({
    buffer,
    folderName: 'locations',
    imageWidth: 750,
    imageHeight: 500,
  });
}
