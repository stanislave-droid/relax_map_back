import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const CategoryModel = model('category', CategorySchema);
