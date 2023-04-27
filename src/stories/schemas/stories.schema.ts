import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
// import { nanoid } from 'nanoid'

export const StorySchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => uuid()
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Pending'
  },
  section: String,
  subsection: String,
  title: String,
  desc: String,
  text: String,
  images: [
    {
      filename: String,
      ratio: String,
      label: String
    }
  ],
  embeded: [String],
  quotes: [String]
}, {
  versionKey: false
});