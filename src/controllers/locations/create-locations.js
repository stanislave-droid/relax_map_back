import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
import { saveLocationPhotoToCloudinary } from '../../utils/saveFileToCloudinary.js';
export const createLocationController = async (req, res) => {
  const { file, user } = req;
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  const id = user._id;
  const result = await saveLocationPhotoToCloudinary(file.buffer);
  const location = LocationModel.create({
    ...req.body,
    image: result.secure_url,
    ownerId: id,
  });
  res.status(201).json({ location });
};
