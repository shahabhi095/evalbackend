const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    user:String
  },
  { versionKey: false }
);

const PostsModel = mongoose.model("userposts", PostsSchema);
module.exports = {
  PostsModel,
};
