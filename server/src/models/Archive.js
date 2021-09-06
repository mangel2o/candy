import { Schema, model } from "mongoose";

const ArchiveSchema = new Schema({
   name: String,
   description: String,
   filepath: String,
   owner: {
      name: String,
      number: Number
   },
   author: {
      name: String,
      number: Number
   }
}, {
   timestamps: true,
   versionKey: true
})

export default model('Archive', ArchiveSchema);