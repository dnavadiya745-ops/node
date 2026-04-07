const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require('./Models/user.model')
const bcrypt = require("bcrypt");
// server memory temporary
// user ni req server pase jay tyare server ne user kon hoy te khbr hoti nathi, mate darek req sathe user ne authorized karvo pade chhe
// user req --> server (check img into folder)
// ex . login req --> server ne khbr nathi hoti user kon chhe
// cookie parser --> save token into browser storage
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/",(req, res)=>{
    res.cookie("username","test@user");
    res.send("server Home");
});

// data --> convert jwt --> save cookie
app.get("/jwt",(req,res)=>{
    let data = {username:"user",email:"user@gmail.com",role:"admin"};
   let token = jwt.sign(data,"random");
   console.log(token)

   res.cookie("token", token);
   res.send("go to app and check cookie")
})

//sign Up
app.get("/signup",async(req,res)=>{
   let createdUser =await userModel.create({
        username: "test",
        email: "test@gmail.com",
        password:"123",
    });
    res.send(createdUser);
})

// for encrypt your password use --> bcrypt package 
// use case : when your data leak your password is safe,if you encrypt your all user password
// encrypt password stages :
// your password  + salt (default random 10 char)=> create a hash
// in database we save hash not password
app.get("/hash",(req,res)=>{
    let password = "123";
     // bcrypt.hash("org.pass","number",(err,hash)=>{})
    bcrypt.hash(password,7,(err,hash)=>{
      console.log(hash);
      res.send(hash);
    });
});

//Login --> password compaired


app.listen(3000,()=>{
    console.log("Server is running on port :3000")
})