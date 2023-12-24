import * as mongoose from 'mongoose';
// import { v4 as uuid } from 'uuid';
import { nanoid } from 'nanoid';

export const FrontSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => nanoid()
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
  cover: String,
  stories: [
    {
      slot: Number,
      id: String,
      section: String,
      headline: String,
      lead: String
    }
  ],
}, {
  versionKey: false
});