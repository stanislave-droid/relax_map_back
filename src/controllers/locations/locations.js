import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
export const createLocationController = async (req, res) => {
  const { name, type, region, description } = req.body;
  const { file, user } = req;
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  const id = user._id;
  const result = LocationModel.create({});
};
