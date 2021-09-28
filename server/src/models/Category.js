import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
   name: {
      type: String,
      unique: true
   },
   uri: {
      type: String,
      unique: true
   },
   description: String,
   templates: [{
      ref: 'Template',
      type: Schema.Types.ObjectId,
   }],
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

export default model('Category', CategorySchema);