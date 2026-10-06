import createHttpError from 'http-errors';
import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Missing access token');
  }
  const session = await SessionModel.findOne({
    _id: sessionId,
    accessToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UserModel.findById(session.userId);
  if (!user) {
    throw createHttpError(401, `User with id: ${session.userId} not found`);
  }

  req.user = user;
  next();
};
