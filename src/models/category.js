import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({});

export const CategoryModel = model('category', CategorySchema);
