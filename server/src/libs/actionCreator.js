import User from "../models/User.js";
import Action from "../models/Action.js";

export default async function createAction(name, type, description, data, createdBy, { affectedStudent = null, affectedUser = null }) {
   // * Creates a new actions
   const createdAction = await new Action({
      name,
      type,
      description,
      data,
      createdBy: createdBy,
      affectedStudent: affectedStudent,
      affectedUser: affectedUser
   }).save();

   // * Adds the new action id to the user's actions
   await User.findByIdAndUpdate(createdBy, { $push: { actions: createdAction._id } }).lean();
}