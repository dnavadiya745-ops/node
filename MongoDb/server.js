const express = require("express");
const app = express();
const userModel = require("./Models/user.model");


app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.set("view engine", 'ejs')


app.get("/",(req, res)=>{

     res.send("Server HomePage")

})

//CRUD

//Create
app.get("/create", async (req, res) => {

    let createUser = await userModel.create({
        username: 'user1',
        name: 'user1 user',
        email: 'user1@gmail.com'
    });

    res.send(createUser);
});

// Read
app.get('/all' , async (req , res)=>{
    // All user
    let allUsers = await userModel.find();
    res.send(allUsers);
});
 //specific user - first only
app.get('/read' , async (req , res)=>{
    let user = await userModel.findOne({username : "test1"});
    res.send(user);
});
    // all user based on query
    app.get('/user' , async (req , res)=>{
    let userData = await userModel.find({username : "test1"});
    res.send(userData);
});
    
//Update
app.get('/update' , async (req , res)=>{
 let updatedUser = await   userModel.findOneAndUpdate(
        {username : "test1"}, // find query
        {username : "test2",email:"test2@gmail.com"}, // update query -- what is change
        {new : true} );
    res.send(updatedUser);
    });

    //Delete
app.get('/delete' , async (req , res)=>{
     await userModel.findOneAndDelete({username : "test2"});
    res.redirect("/all");
});

app.listen(3000,()=>{
    console.log("Server is running..")
})