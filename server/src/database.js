import mongoose from "mongoose";

// TODO: Create own mongoDB connection
// * To install mongoDB locally, follow this guide https://youtu.be/3wqzr-GJoS0
mongoose.connect("")
   .then(db => console.log("Db is connected"))
   .catch(err => console.log(err));
