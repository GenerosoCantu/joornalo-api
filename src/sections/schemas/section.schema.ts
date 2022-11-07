import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
// import { nanoid } from 'nanoid'

export const SectionSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => uuid()
  },
  id: String,
  name: String,
  email: String,
  desc: String,
  status: {
    type: String,
    default: 'Pending'
  },
  covers: [String],
  subsections: [
    {
      id: String,
      name: String,
      order: Number
    }
  ],
  config: {
    front_include_headlines: Boolean,
    front_include_most_viewed: Boolean,
    split_paragraphs: Boolean,
    summary_max_characters: Number,
    photo_default_size: String
  }
}, {
  versionKey: false
});