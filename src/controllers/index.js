import getLocations from './locations/get-locations.js';
import { getRegions } from './categories/getRegions.js';
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';
import { refreshAuthSession } from './auth/refresh.js';
import { getFeedback } from './feedbacks/getFeedback.js';

export const authControllers = {
  registerUser,
  loginUser,
  refreshAuthSession,
};

export const categoriesControllers = {
  getRegions,
};

export const usersControllers = {};

export const feedbacksControllers = {
  getFeedback
};

export const locationsControllers = {
  getLocations,
};
