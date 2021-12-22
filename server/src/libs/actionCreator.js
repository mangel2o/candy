import User from "../models/User.js";
import Action from "../models/Action.js";

export default async function createAction(description, createdBy, { createdForStudent, createdForUser }) {
   // * Creates a new actions
   const createdAction = await new Action({
      description,
      createdBy,
      createdForStudent,
      createdForUser
   }).save();

   // * Adds the new action id to the user's actions
   await User.findByIdAndUpdate(createdBy, { $push: { actions: createdAction._id } }).lean();
}