import User from "../models/User";
import config from "../config";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
   const { email, password } = req.fields;

   const userFound = await User.findOne({ email: email }).populate('role');

   if (!userFound) return res.json({ errorEmail: "El usuario no existe" });

   const matchPassword = await User.comparePassword(password, userFound.password);

   if (!matchPassword) return res.json({ errorPassword: "Contraseña incorrecta" });

   res.json(userFound);

}

export const getUsers = (req, res) => {

}

export const getUserById = (req, res) => {

}

export const updateUserById = (req, res) => {

}

export const deleteUserById = (req, res) => {

}

