import { Schema, model } from "mongoose";

const TemplateSchema = new Schema({
   name: String,
   description: String,
   category: String,
   exampleFilepath: String,
   author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Template', TemplateSchema);