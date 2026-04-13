const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// data base validations
let userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase : true,
    },
    password : {
        type : String,
        required:true,
        select : false, // select false hoy to response ma add na thay 
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user",
       
    }
})


// jwt token
userSchema.methods.generateAuthToken =function(){
    let token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    return token;
}; // this._id --> database user's id

// bcrypt
//hash(static)
userSchema.statics.hashPassword = async function(password){
    let hash = await bcrypt.hash(password,10);
    return hash;
}
//compaire(methods)
userSchema.methods.comparepassword = async function(password){
    let result = await bcrypt.compare(password,this.password);
     return result;
}; // this.password --> database user's password

module.exports = mongoose.model("user",userSchema);