import { Schema, model } from "mongoose";

const TemplateSchema = new Schema({
   name: String,
   description: String,
   category: String,
   exampleFilepath: String,
   author: {
      name: String,
      number: Number
   }
}, {
   timestamps: true,
   versionKey: true
})

export default model('Template', TemplateSchema);