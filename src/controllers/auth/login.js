import { UserModel } from '../../models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid email or password');
  }

  // await Session.deleteOne({ userId: user._id});
  //
  // const newSession = await createSession(user._id);
  // setSessionCookies(res, newSession);

  res.status(200).json(user);
};
