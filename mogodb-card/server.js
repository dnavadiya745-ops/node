const express = require("express");
const app = express();
const userModel = require('./Models/user.model')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/",(req, res)=>{
    res.render("index");
});


//create card
app.post("/create",async (req, res)=>{
let {fname, uname, email, img } = req.body;

await userModel.create({
    fullname:fname,
    username: uname,
    email: email,
    image: img,
})
res.redirect("/card")
})


//read card
app.get("/card", async (req, res)=>{
    let allusers = await userModel.find()
    res.render("card",{data: allusers})
})

//delete
app.get("/delete/:id" , async (req , res)=>{
    await userModel.findOneAndDelete({_id: req.params.id});

    res.redirect("/card");
})

//edit Card
//1. show all data --> show filled form
app.get("/show/:id", async(req,res)=>{
   let user= await userModel.findOne({_id: req.params.id});

   res.render("edit/:id",{user});
})
//2. set new data --> edit form and submit
app.post("/edit/:id",async(req,res)=>{
    let{fname, uname, email, img} = req.body;
    await userModel.findOneAndDelete({_id: req.params.id},{fullname:fname, username:uname, email,image:img},{new: true});
    res.redirect("/card");
})

app.listen(3000,()=>{
    console.log("Server is running on port :3000")
})