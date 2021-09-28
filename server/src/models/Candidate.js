import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CandidateSchema = new Schema({
   name: String,
   number: {
      type: Number,
      unique: true
   },
   level: String,
   campus: String,
   genre: String,
   active: String,
   career: String,
   phone: String,
   email: String,
   modality: String,
   terminationPeriod: String,
   terminationYear: Number,
   graduationPeriod: String,
   graduationYear: Number,
   photo: String,
   status: String,
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

export default model('Candidate', CandidateSchema);