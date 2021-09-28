import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ObservationSchema = new Schema({
   name: String,
   comment: String,
   owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
   },
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

export default model('Observation', ObservationSchema);