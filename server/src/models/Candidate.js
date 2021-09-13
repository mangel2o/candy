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
   photo: String,
   categories: [String],
   documents: [{
      ref: 'Document',
      type: Schema.Types.ObjectId,
   }],
   observations: [{
      ref: 'Observation',
      type: Schema.Types.ObjectId,
   }],
   archives: [{
      ref: 'Archive',
      type: Schema.Types.ObjectId,
   }],
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

export default model('Candidate', CandidateSchema);