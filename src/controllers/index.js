import getLocations from './locations/get-locations.js';
import { getRegions } from './categories/getRegions.js';
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';
import { refreshAuthSession } from './auth/refresh.js';
import { getFeedback } from './feedbacks/getFeedback.js';
import { logout } from './auth/logout.js';
import { getCategoryTypesController } from './categories/getTypes.js';
import {
  getCurrentUserController,
  getUserByIdController,
  getUserLocations,
} from './users/usersController.js';
import { updateLocation } from './locations/updateLocation.js';

export const authControllers = {
  registerUser,
  loginUser,
  refreshAuthSession,
  logout,
};

export const categoriesControllers = {
  getCategoryTypesController,
  getRegions,
};

export const usersControllers = {
  getUserByIdController,
  getUserLocations,
  getCurrentUserController,
};

export const feedbacksControllers = {
  getFeedback,
};

export const locationsControllers = {
  getLocations,
  updateLocation,
};
