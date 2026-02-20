import { Schema, model } from 'mongoose';
import { NOTES_SCHEMA_NAME } from '../lib/constants';

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
      default: null,
      index: true
    },
    jsonBody: {
      type: Object,
      required: false,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const User = model(NOTES_SCHEMA_NAME, userSchema);