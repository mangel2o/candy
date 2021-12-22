import Mongoose from "mongoose";
import User from "../models/User.js";

export const createUser = async (req, res) => {
   // * Gets values
   const data = req.fields;

   // * Checks if the student already exists
   const userExist = await User.findOne({ number: data.number }).lean();
   if (userExist) return res.status(500).json("Este usuario ya existe");

   // TODO: Create a random generated password

   // * Creates a new user
   const userCreated = await new User({
      name: data.name,
      number: data.number,
      campus: data.campus,
      genre: data.genre,
      active: data.active,
      phone: data.phone,
      personalEmail: data.personalEmail,
      institutionalEmail: `al${data.number}@tecmilenio.mx`,
      password: await User.encryptPassword("password"),
      role: data.role
   }).save();

   // TODO: Implement a way of sending emails to newly created users/students

   // * Sends the created student as the response
   res.send(userCreated);
}


export const getUsers = async (req, res) => {
   // * Finds all users and sends them to the client
   // ! Delete the parameters inside the find function to send all users
   const usersFound = await User.find({ role: { $ne: "Usuario" } }).lean();
   res.send(usersFound);
}


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


export const updateUserById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const userId = req.params.userId;
   if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(500).json("Este usuario no existe");

   // * Gets values
   const data = req.fields;

   // * Checks if the user exists
   const userExist = await User.findById(userId).lean();
   if (!userExist) return res.status(500).json("Este usuario ya no existe");

   // * Checks if the new users's number isn't used already
   const userExistByNumber = await User.findOne({ _id: { $ne: userId }, number: data.number }).lean();
   if (userExistByNumber) return res.status(500).json("Esta matricula ya esta en uso");

   // * Updates the user based on the user data
   const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
         name: data.name,
         number: data.number,
         campus: data.campus,
         personalEmail: data.personalEmail,
         institutionalEmail: `al${data.number}@tecmilenio.mx`,
         role: data.role
      }
   ).lean();

   res.send(userUpdated);
}


export const deleteUserById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const userId = req.params.userId;
   if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(500).json("Este usuario no existe");

   // * Checks if the user exists
   const userExist = await User.findById(userId).lean();
   if (!userExist) return res.status(500).json("Este usuario ya no existe");

   // * Deletes the user
   const userDeleted = await User.findOneAndDelete({ number: userExist.number }).lean();

   // * Sends the deleted user as response
   res.send(userDeleted);
}
