import User from "../models/User.js";
import fs from "fs";

// TODO: Change the way the pdfs are saved if needed
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
            name: "Admin",
            number: 123456789,
            campus: "Las Torres",
            genre: "Hombre",
            active: "Activo",
            phone: "123456789",
            personalEmail: "admin@outlook.com",
            institutionalEmail: "admin@tecmilenio.mx",
            password: await User.encryptPassword("admin"),
            role: "Administrador"
         }).save(),
      ]);
      console.log(values);
   } catch (error) {
      console.log(error);
   }
}
