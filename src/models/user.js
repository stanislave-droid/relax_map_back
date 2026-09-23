import { Schema, model } from 'mongoose';

const UserSchema = new Schema({});

export const UserModel = model('user', UserSchema);
