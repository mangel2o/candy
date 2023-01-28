import mongoose from "mongoose";

// TODO: Create own mongoDB connection
// * To install mongoDB locally, follow this guide https://youtu.be/3wqzr-GJoS0
// * Mongoose is an ODM for mongoDB, it makes life easier 👍
mongoose.connect("mongodb://127.0.0.1/candy-test")
   .then(db => console.log("Db is connected"))
   .catch(err => console.log(err));
