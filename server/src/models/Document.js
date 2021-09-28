import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DocumentSchema = new Schema({
   name: String,
   description: String,
   category: String,
   status: String,
   examplePath: String,
   path: String,
   owner: {
      ref: 'Candidate',
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
});

export default model('Document', DocumentSchema);