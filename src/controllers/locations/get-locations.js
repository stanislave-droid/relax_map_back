import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';

export default async function getLocations(req, res) {
  const {
    page = 1,
    limit = 10,
    region,
    type,
    search,
    sortBy = '_id',
    sortDirection = 'desc',
  } = req.query;

  const customLocationsQuery = LocationModel.find();

  if (search) {
    customLocationsQuery.where({
      $or: [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  if (region) {
    customLocationsQuery.where('region').equals(region);
  }

  if (type) {
    customLocationsQuery.where('locationType').equals(type);
  }

  const skip = (page - 1) * limit;

  const [locations, countLocations] = await Promise.all([
    customLocationsQuery
      .clone()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortDirection == 'desc' ? -1 : 1, _id: 1 }),
    customLocationsQuery.countDocuments(),
  ]);

  if (!locations) {
    throw createHttpError(404, 'Locations note found');
  }

  const totalPages = Math.ceil(countLocations / limit);

  res.status(200).json({
    locations,
    page,
    limit,
    totalPages,
    totalLocations: countLocations,
  });
}
