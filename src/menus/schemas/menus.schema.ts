import * as mongoose from 'mongoose';
// import { v4 as uuid } from 'uuid';
import { nanoid } from 'nanoid';

export const MenuSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: true,
    unique: true,
    default: () => nanoid()
  },
  menuName: {
    type: String,
    unique: true
  },
  menuOptions: [
    {
      id: {
        type: String,
        unique: true,
        default: () => nanoid()
      },
      order: Number,
      name: String,
      link: String,
      active: Boolean,
      dependencyId: String,
      css: String
    }
  ],
}, {
  versionKey: false
});