import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
   name: {
      type: String,
      unique: true
   },
   description: String,
   templates: [{
      ref: 'Template',
      type: Schema.Types.ObjectId,
   }],
   author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Category', CategorySchema);