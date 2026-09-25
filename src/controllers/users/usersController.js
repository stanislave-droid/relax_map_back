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

export const getCurrentUserController = async (req, res) => {
  const { user } = req;
  const { _id, name, avatarUrl, articlesAmount } = user;

  res.status(200).json({ _id, name, avatarUrl, articlesAmount });
};
