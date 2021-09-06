import { Schema, model } from "mongoose";

const CandidateSchema = new Schema({
   name: String,
   number: {
      type: Number,
      unique: true
   },
   career: String,
   genre: String,
   status: String,
   terminationPeriod: String,
   terminationYear: Number,
   graduationPeriod: String,
   graduationYear: Number,
   level: String,
   modality: String,
   campus: String,
   phone: Number,
   email: String,
   categories: [String],
   photo: String,
   author: {
      name: String,
      number: Number
   }
}, {
   timestamps: true,
   versionKey: true
})

export default model('Candidate', CandidateSchema);