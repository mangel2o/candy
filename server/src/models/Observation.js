import { Schema, model } from "mongoose";

const ObservationSchema = new Schema({
   name: String,
   comment: String,
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

export default model('Observation', ObservationSchema);