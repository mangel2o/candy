import { Schema, model } from "mongoose";

const DocumentSchema = new Schema({
   name: String,
   description: String,
   category: String,
   status: String,
   exampleFilepath: String,
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

export default model('Document', DocumentSchema);