import * as mongoose from 'mongoose';

export const ModuleSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true
  },
  name: String,
  status: {
    type: String,
    default: 'Pending'
  },
  order: Number
}, {
  versionKey: false
});