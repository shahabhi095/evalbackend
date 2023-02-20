const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("userdetails", UserSchema);
module.exports = {
  UserModel,
};
