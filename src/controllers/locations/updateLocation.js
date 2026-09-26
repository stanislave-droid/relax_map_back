import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
import { saveLocationPhotoToCloudinary } from '../../utils/saveFileToCloudinary.js';

export async function updateLocation(req, res) {
  const locationId = req.params.locationId;
  const { _id } = req.user;
  const { file } = req;
  let update;

  if (file !== undefined) {
    const result = await saveLocationPhotoToCloudinary(file.buffer);
    const fileUrl = result.secure_url;
    update = {
      ...req.body,
      image: fileUrl,
    };
  } else {
    update = req.body;
  }

  const location = await LocationModel.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    update,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (location === null) {
    throw createHttpError(404, 'Location not found.');
  }

  res.status(200).json(location);
}
