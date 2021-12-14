import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
   name: String,
   number: {
      type: String,
      unique: true
   },
   campus: String,
   genre: String,
   active: String,
   phone: String,
   personalEmail: String,
   institutionalEmail: String,
   password: String,
   role: String,
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

UserSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword);
}

export default model('User', UserSchema);