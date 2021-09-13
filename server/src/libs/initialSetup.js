import User from "../models/User";

export const createUsers = async () => {
   try {

      const count = await User.estimatedDocumentCount();
      if (count > 0) return;

      const values = await Promise.all([
         new User({
            name: "Miguel Ángel Castro García",
            number: 2865034,
            campus: "Las Torres",
            email: "mangelcg.2o@outlook.com",
            password: await User.encryptPassword("password"),
            role: "admin"
         }).save(),
         new User({
            name: "Alberto",
            number: 2788124,
            campus: "Las Torres",
            email: "Alberto.2o@outlook.com",
            password: await User.encryptPassword("12345"),
            role: "moderator"

         }).save(),
         new User({
            name: "Goku",
            number: 2864123,
            campus: "Las Torres",
            email: "Goku.2o@outlook.com",
            password: await User.encryptPassword("random"),
            role: "user"

         }).save(),
      ]);
      console.log(values);
   } catch (error) {
      console.log(error);
   }
}

/**
 *
 *
 *
 */