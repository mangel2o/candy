import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TemplateSchema = new Schema({
   name: String,
   description: String,
   category: String,
   examplePath: String,
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

export default model('Template', TemplateSchema);