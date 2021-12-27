import Mongoose from "mongoose";
import User from "../models/User.js";

export const getUserById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const userId = req.params.userId;
   if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(500).json("Este usuario no existe");

   // * Checks if the user exists
   const userExist = await User.findById(userId).lean();
   if (!userExist) return res.status(500).json("Este usuario no existe");

   // * Sends the user as response
   res.send(userExist);
}

export const changePassword = async (req, res) => {
   // * Initializes values
   const { oldPassword, newPassword, confirmPassword, userId } = req.fields;

   // * Check if user exists
   const userExist = await User.findById(userId).lean();
   if (!userExist) return res.status(500).json("Este usuario ya no existe");

   console.log(oldPassword, newPassword)
   // * Checks if the old password is correct
   const oldPasswordMatches = await User.comparePassword(oldPassword, userExist.password);
   if (!oldPasswordMatches) return res.status(500).json("La contraseña antigua es incorrecta");
   console.log(oldPasswordMatches);

   // * Updates the user's password with the new one
   await User.findByIdAndUpdate(userId, { password: await User.encryptPassword(newPassword), }, { new: true });

   // * Sends the created observation as response
   res.json({ success: "La contraseña ha sido actualizada exitosamente" });
}
