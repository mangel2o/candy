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
               { personalEmail: identificator },
               { number: identificator }
            ]
      }
   );
   if (!userExist) return res.json({ error: "El usuario o contraseña son incorrectos" });

   // * Checks if the password matches
   const passwordMatches = await User.comparePassword(password, userExist.password);
   if (!passwordMatches) return res.json({ error: "El usuario o contraseña son incorrectos" });

   // * Sends the user as response
   res.json(userExist);
}