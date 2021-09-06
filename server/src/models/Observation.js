import { Schema, model } from "mongoose";

const ObservationSchema = new Schema({
   name: String,
   comment: String,
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

export default model('Observation', ObservationSchema);