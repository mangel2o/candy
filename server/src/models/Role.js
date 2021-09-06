import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
   role: String,
}, {
   versionKey: false
})

export default model('Role', RoleSchema);