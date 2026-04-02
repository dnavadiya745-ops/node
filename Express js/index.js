// create a express srever

// package.json --> type = module --> import
// package.json --> type = commom.js --> const, require

const express =  require("express");
const path = require("path");

const app = express();

// middleware ---> middleware was wun before route, call before function
// usecase: Authorization, Authentication, vaildation, Error
// user req ---> server 
// (server req) server res ---> user
// with middlware : user req ---> middelware(server) ---> server route

app.use(function(req,res,next){
    console.log("This is Middleware 🧑‍💻")
    next() 
});

// login req --> middleware (check user into database) --> server route (show profile page)

// create a route
app.get("/", function(req, res){
    res.send("🙏 welcome to express.js 😊")
});

app.get('/profile', function(req,res){
    res.send("Show Profile Page 📃")
});

app.get('/login', function(req,res){
    const dirPath = path.resolve();
    const FilePath = path.join(dirPath, 'Pages', 'Login.html')
    res.sendFile(FilePath)
});

app.get('/signup', function(req,res){
    res.send("signup Your Account 👨‍🎓")
});


// error handling middleware :
// las listed route
// always write after all route because it will catch all errors that are not handled by the previous routes
app.use(function(req,res){
    res.send("404 Not Found 😔")
    // res.status(404).send("404 Not Found 😔")
     res.status(500).send("something went wrong ")
})
app.listen(1012, ()=>{
    console.log("✅ Server Is Running....🏃‍♀️")
});