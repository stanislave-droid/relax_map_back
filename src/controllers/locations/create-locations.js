import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
import { saveLocationPhotoToCloudinary } from '../../utils/saveFileToCloudinary.js';
export const createLocationController = async (req, res) => {
  const { file, user } = req;
  if (!file) {
    throw createHttpError(400, 'Image file is required');
  }
  const id = user._id;
  const result = await saveLocationPhotoToCloudinary(file.buffer);
  const location = await LocationModel.create({
    ...req.body,
    image: result.secure_url,
    ownerId: id,
  });
  res.status(201).json(location);
};
