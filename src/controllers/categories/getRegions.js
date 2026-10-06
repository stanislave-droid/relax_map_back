import { RegionModel } from '../../models/region.js';

export const getRegions = async (req, res, next) => {
  try {
    const regions = await RegionModel.find();

    res.status(200).json(regions);
  } catch (error) {
    next(error);
  }
};
