import { Schema, model } from "mongoose";

const ArchiveSchema = new Schema({
   name: String,
   description: String,
   filepath: String,
   owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
   author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Archive', ArchiveSchema);