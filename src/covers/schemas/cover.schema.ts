import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export const CoverSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => uuid()
  },
  name: String,
  image: String,
  description: String,
});