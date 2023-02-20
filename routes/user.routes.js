const express = require("express");
const {UserModel} = require("../model/user.model")

const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

UserRouter.get("/", async(req,res)=>{
    const userdetails =await UserModel.find()
    console.log("HOME PAGE");
    res.send(userdetails)
})

UserRouter.post("/register", async(req,res)=>{

    const {name,email,gender,password,age,city} = req.body;
   const user = await UserModel.find({email})
   
    try{
        if (user.length > 0) {
          res.send({ msg: "User already exist, please login" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
              if (err) {
                console.log(req.body);
                res.send({ err: err.message });
              } else {
                const userdetails = new UserModel({
                  name,
                  email,
                  gender,
                  password: hash,
                  age,
                  city,
                });
                await userdetails.save();
                res.send({ msg: "A new user has registered" });
              }
            }); 
        }
       

    }catch(err){res.send({"err":err.message})}
})


UserRouter.post("/login", async (req, res) => {
  const {  email, password} = req.body;

  try {
const userdetails = await UserModel.find({email})
if (userdetails.length>0){
 bcrypt.compare(password, userdetails[0].password, async (err, result) => {
    console.log(result)
   if (result) {
    let token = jwt.sign({userID:userdetails[0]._id}, "masai")
    res.send({"msg":"you have registered succesfully", "token":token})
   } else {
     res.send({ msg: "Something went wrong" });
   }
 });
}else{
   res.send({ msg: "wrong crendential" });  
}
 
  } catch (err) {
    res.send({ err: err.message });
  }
});

module.exports={
    UserRouter
}
