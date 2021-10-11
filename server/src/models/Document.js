import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DocumentSchema = new Schema({
   name: String,
   description: String,
   category: {
      ref: 'Category',
      type: Schema.Types.ObjectId,
   },
   comment: String,
   status: String,
   examplePath: String,
   filepath: String,
   template: {
      ref: "Template",
      type: Schema.Types.ObjectId,
   },
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