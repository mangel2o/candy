import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
   name: String,
   number: {
      type: Number,
      unique: true
   },
   campus: String,
   email: {
      type: String,
      unique: true
   },
   password: String,
   role: {
      ref: 'Role',
      type: Schema.Types.ObjectId
   },
}, {
   timestamps: true,
   versionKey: true
})

UserSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
   await bcrypt.compare(password, receivedPassword);
}

export default model('User', UserSchema);