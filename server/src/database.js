import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/candy-test")
   .then(db => console.log("Db is connected"))
   .catch(err => console.log(err));
