import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ActionSchema = new Schema({
   description: String,
   createdBy: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
   createdForStudent: {
      ref: 'Student',
      type: Schema.Types.ObjectId,
   },
   createdForUser: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   }
}, {
   timestamps: true,
})

export default model('Action', ActionSchema);