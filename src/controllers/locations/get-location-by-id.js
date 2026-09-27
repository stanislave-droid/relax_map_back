import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';

export const getLocationByIdController = async (req, res) => {
  const { locationId } = req.params;
  const location = await LocationModel.findById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }
  res.status(200).json({ location });
};
