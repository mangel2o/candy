import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
   name: String,
   description: String,
   author: {
      name: String,
      number: Number
   }
}, {
   timestamps: true,
   versionKey: true
})

export default model('Category', CategorySchema);