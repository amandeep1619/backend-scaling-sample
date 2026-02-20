import { Schema, model } from 'mongoose';
import { NOTE_BOOK_SCHEMA_NAME, NOTES_SCHEMA_NAME, USER_SCHEMA_NAME } from '../lib/constants';

const noteBookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER_SCHEMA_NAME
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    sharedWith: [{
      type: Schema.Types.ObjectId,
      ref: USER_SCHEMA_NAME
    }],
    notes:[
      {
        type: Schema.Types.ObjectId,
        ref: NOTES_SCHEMA_NAME
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const NoteBook = model(NOTE_BOOK_SCHEMA_NAME, noteBookSchema);