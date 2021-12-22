import Mongoose from "mongoose";
import Action from "../models/Action.js";
import User from "../models/User.js";

export const getActions = async (req, res) => {
   // * Finds all actions
   const actionsFound = await Action.find().lean();
   res.send(actionsFound);
}


export const getActionsByUserId = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const userId = req.params.userId;
   if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(500).json("Este usuario no existe");

   // * Checks if the user exists
   const userExist = await User.findById(userId).lean();
   if (!userExist) return res.status(500).json("Este usuario no existe");

   const actionsFound = await Action.find({ createdBy: userId }).lean();

   // * Sends the user as response
   res.send(actionsFound);
}