import { Schema, model } from 'mongoose';

const SessionSchema = new Schema({});

export const SessionModel = model('session', SessionSchema);
