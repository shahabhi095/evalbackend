const express = require("express");
const { PostsModel } = require("../model/posts.model");

const PostsRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

PostsRouter.get("/", async (req, res) => {
    const query = req.query
    console.log(query)
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai",async (err, decoded) => {
      if (decoded) {
        const posts = await PostsModel.find({user:decoded.userID, ...query})
        console.log(posts)
        res.send(posts)
      } else {
        res.send({ msg: "you have not added your notes", err });
      }
    });
  } else {
    res.send("please login first");
  }
});

PostsRouter.get("/top", async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        const posts = await PostsModel.find({ user: decoded.userID }).sort(
        {  no_of_comments:-1}
        );
        console.log(posts);
        res.send(posts[0]);
      } else {
        res.send({ msg: "you have not added your notes", err });
      }
    });
  } else {
    res.send("please login first");
  }
});


PostsRouter.post("/create", async(req,res)=>{
    const posts = new PostsModel(req.body);
    await posts.save();
    res.send("Posts is created")
})

PostsRouter.patch("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;
    const posts = await PostsModel.findOne({_id:id})
    const userID_in_posts = posts.user;
    const userID_making_req= req.body.user;
    try{
        if(userID_in_posts!=userID_making_req){
            res.send("you are not authorized")
        }else{
            await PostsModel.findByIdAndUpdate({_id:id},payload)
            res.send(`posts with id ${id} has been updated`)
        }
    }catch(err){
        console.log(err);
        res.send("Something went wrong")
    }
})

PostsRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const posts = await PostsModel.findOne({ _id: id });
  const userID_in_posts = posts.user;
  const userID_making_req = req.body.user;
  try {
    if (userID_in_posts != userID_making_req) {
      res.send("you are not authorized");
    } else {
      await PostsModel.findByIdAndDelete({ _id: id });
      res.send(`posts with id ${id} has been deleted`);
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});
module.exports = {
  PostsRouter,
};
