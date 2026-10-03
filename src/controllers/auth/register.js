import { UserModel } from '../../models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../../services/sessionService.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;
  try {
    newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

  } catch (error) {
    if(error.code === 11000) {
      throw createHttpError(400, 'User with this email already exists');
    }

    throw error;
  }

  const session = await createSession(newUser._id);
  setSessionCookies(res, session)

  res.status(201).json(newUser);
};
