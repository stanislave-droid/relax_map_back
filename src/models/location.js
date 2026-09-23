import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({});

export const LocationModel = model('location', LocationSchema);
