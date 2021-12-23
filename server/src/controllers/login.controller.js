import Student from "../models/Student.js";
import User from "../models/User.js";

export const signIn = async (req, res) => {
   // * Gets the values
   let { identificator, password } = req.fields;
   identificator = identificator.toLowerCase();

   // * Checks if the user exist
   const userExist = await User.findOne(
      {
         $or:
            [
               { institutionalEmail: identificator },
               { number: identificator }
            ]
      }
   ).lean();
   if (!userExist) return res.json({ error: "El usuario o contraseña son incorrectos" });

   // * Checks if the password matches
   const passwordMatches = await User.comparePassword(password, userExist.password);
   if (!passwordMatches) return res.json({ error: "El usuario o contraseña son incorrectos" });

   let user = { ...userExist };
   if (userExist.role === "Usuario") {
      const studentFound = await Student.findOne({ number: userExist.number }).lean();
      user.studentId = studentFound._id;
   }

   console.log(user._id);

   // * Sends the user as response
   res.json(user);
}