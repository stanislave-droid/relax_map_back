import { User } from '../models/user.js';

export const getUserById = async (userId) => {
  return User.findById(userId);
};
