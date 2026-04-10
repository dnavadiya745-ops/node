const userService = require("../services/user.service");
const {validationResult} = require("express-validator");

module.exports.registerUser = async(req,res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }

    const {username,email,password} = req.body;

    const hashPassword = await bcrypt.hash(password);

const user = await userService.createUser({username,emaill,password:hashPassword});
    
};