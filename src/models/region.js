import { Schema, model } from 'mongoose';

const RegionSchema = new Schema({
  region: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

export const RegionModel = model('region', RegionSchema);
