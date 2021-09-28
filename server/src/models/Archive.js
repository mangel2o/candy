import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ArchiveSchema = new Schema({
   name: String,
   description: String,
   filepath: String,
   owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
   createdBy: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
   updatedBy: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Archive', ArchiveSchema);