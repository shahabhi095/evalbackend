const express = require("express");
const {connection } = require("./configs/db")
const {UserRouter} = require("./routes/user.routes")
const {authenticate} = require("./middleware/authenticate.mid")
const {PostsRouter} = require("./routes/posts.route")
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(cors());
require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("Home ")
})

app.use("/users", UserRouter);
app.use(authenticate);
app.use("/posts", PostsRouter);



app.listen(process.env.port, async()=>{
    console.log(`server is running on port${process.env.port}`);
    try{
        await connection
        console.log("Server is connecte to DB")
    }catch(err){
        console.log({"msg":"Something went Wrong", "err":err.message})
    }
});