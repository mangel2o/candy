import User from "../models/User.js";
import fs from "fs";

export const createDirs = async () => {
   const base = "./uploads/";
   const dirs = [
      base,
      base + "templates",
      base + "archives",
      base + "documents",
   ];

   dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir);
      }
   })
}

export const createUsers = async () => {
   try {
      const count = await User.estimatedDocumentCount();
      if (count > 0) return;

      const values = await Promise.all([
         new User({
            name: "Miguel Ángel Castro García",
            number: "al02865034",
            campus: "Las Torres",
            genre: "Hombre",
            active: "Activo",
            phone: 8120317210,
            personalEmail: "mangelcg.2o@outlook.com",
            institutionalEmail: "al02865034@tecmilenio.mx",
            password: await User.encryptPassword("password"),
            role: "Administrador"
         }).save(),
         new User({
            name: "Alberto",
            number: "al02788124",
            campus: "Las Torres",
            genre: "Hombre",
            active: "Activo",
            phone: 8120317210,
            personalEmail: "Alberto.2o@outlook.com",
            institutionalEmail: "al02788124@tecmilenio.mx",
            password: await User.encryptPassword("12345"),
            role: "Moderador"

         }).save(),
         new User({
            name: "Goku",
            number: "al02864123",
            campus: "Las Torres",
            genre: "Hombre",
            active: "Activo",
            phone: 8120317210,
            personalEmail: "Goku.2o@outlook.com",
            institutionalEmail: "al02864123@tecmilenio.mx",
            password: await User.encryptPassword("random"),
            role: "Usuario"
         }).save(),
      ]);
      console.log(values);
   } catch (error) {
      console.log(error);
   }
}
