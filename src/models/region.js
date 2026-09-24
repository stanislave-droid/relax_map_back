import { Schema, model } from 'mongoose';

const RegionSchema = new Schema({});

export const RegionModel = model('region', RegionSchema);
