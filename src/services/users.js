import { UserModel } from '../models/user.js';

export const getUserById = async (userId) => {
  return UserModel.findById(userId);
};
