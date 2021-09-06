import { Schema, model } from "mongoose";

const DocumentSchema = new Schema({
   name: String,
   description: String,
   category: String,
   status: String,
   exampleFilepath: String,
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

export default model('Document', DocumentSchema);