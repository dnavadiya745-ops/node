const userModel = require("../models/user.model");
const adminservice = require("../services/admin.services");
const { validationResult } = require("express-validator");

// show all user logic
module.exports.Alluser = async (req,res)=>{

    try {
        const user = await adminservice.getAllUser();

        return res.status(200).json({message: "user fetch success..",user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// delete user logic
module.exports.dltuser = async (req,res)=>{

    try {
        const user = await adminservice.dltuser(req.params.id);

       if (!user) {
         return res.status(404).json({message: "user not found"})
       }
        return res.status(200).json({message: "user delete success.."})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// manager creation logic
module.exports.registermanager = async(req,res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }

    const {username,email,password,role} = req.body;

     let isExist = await userModel.findOne({email : email});
     if (isExist) {
        return res.status(400).json({ message :"user is already exist"})
     }

    const hashPassword = await userModel.hashPassword(password);

const user = await adminservice.createmanager({username,email,password:hashPassword,role});

let token = await user.generateAuthToken();
res.status(200).json({ token,user});
    
};
