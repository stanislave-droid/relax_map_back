import { LocationModel } from '../../models/location.js';
import { getUserById } from '../../services/users.js';
import createHttpError from 'http-errors';

export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  const user = await getUserById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const { _id, name, avatarUrl, articlesAmount } = user;

  res.status(200).json({ _id, name, avatarUrl, articlesAmount });
};

export async function getUserLocations(req, res) {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = Math.max(0, (page - 1) * limit);

  if (!(await getUserById(userId))) {
    throw createHttpError(404, 'User not found');
  }

  const query = LocationModel.find({
    ownerId: userId,
  });

  const [totalLocations, locations] = await Promise.all([
    query.clone().countDocuments(),
    query.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalLocations / limit);

  res.status(200).json({
    page,
    perPage: limit,
    totalLocations,
    totalPages,
    locations,
  });
}
