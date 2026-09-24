import createHttpError from 'http-errors';
import { UserModel } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if(!sessionId || !accessToken) {
    throw createHttpError(404, "Missing access token");
  }
  const session = await Session.findOne({ _id: sessionId, accessToken });

  if(!session) {
    throw createHttpError(401, "Session not found");
  }

  const isAccessTokenExpired = await session.accessTokenValidUntil < new Date();
  if (isAccessTokenExpired) {
    throw createHttpError(401, "Access token expired");
  }

  const user = await UserModel.findById(session.userId);
  if(!user) {
    throw createHttpError(401, `User: ${user} not found`);
  }

  req.user = user;
  next();
}
