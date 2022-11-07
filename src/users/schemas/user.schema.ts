import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
// import { nanoid } from 'nanoid'

export const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => uuid()
  },
  email: String,
  role: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: String,
  status: {
    type: String,
    default: 'Pending'
  },
  reg_time: {
    type: Date,
    default: Date.now
  },
  login_fail: Number,
  locked: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  permissions: [String],
  sections: [String],
  modules: [String]
}, {
  versionKey: false
});

export const PermissionsSchema = new mongoose.Schema({
  permissions: [String]
}, {
  versionKey: false
});