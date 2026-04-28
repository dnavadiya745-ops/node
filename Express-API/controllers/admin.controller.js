const userModel = require("../models/user.model");
const adminservice = require("../services/admin.service");
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

// update user role
module.exports.updateuserrole =  async(req,res) =>{
    try {
       const userId = req.params.id;
       const { role } = req.body;

       if (req.user.role !== 'admin') {
         return res.status(401).json({ message: "Access Denied......." });
        }
        const user  = await adminservice.updateuserrole({ userId, role });
         if (!user) {
            throw new Error ("User Not Found !!");
         }

         return res.status(200).json({ message: "User Role Updated Successfully", user });
       
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
