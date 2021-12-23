import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ActionSchema = new Schema({
   name: String,
   type: String,
   description: String,
   data: String,
   createdBy: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
   affectedStudent: {
      ref: 'Student',
      type: Schema.Types.ObjectId,
   },
   affectedUser: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Action', ActionSchema);