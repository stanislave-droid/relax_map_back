import { SessionModel } from '../../models/session.js';

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;

  await SessionModel.findByIdAndDelete(sessionId);

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
