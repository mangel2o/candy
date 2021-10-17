import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentSchema = new Schema({
   name: String,
   number: {
      type: String,
      unique: true
   },
   level: String,
   campus: String,
   genre: String,
   active: String,
   career: String,
   phone: String,
   personalEmail: String,
   institutionalEmail: String,
   modality: String,
   terminationPeriod: String,
   terminationYear: Number,
   graduationPeriod: String,
   graduationYear: Number,
   photoPath: String,
   status: String,
   categories: [{
      ref: 'Category',
      type: Schema.Types.ObjectId,
   }],
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

export default model('Student', StudentSchema);