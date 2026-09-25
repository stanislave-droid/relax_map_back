import { Schema, model } from 'mongoose';
import { emailRegex } from '../constants/emailRegex.js';
import { DEFAULT_AVATAR_URL } from '../constants/avatar.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: emailRegex,
    required: true,
    trim: true,
    maxLength: 64,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: DEFAULT_AVATAR_URL,
  },
  articlesAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = model('user', userSchema);
