// show all user logic

const userModel = require("../models/user.model");

//get all user
module.exports.getAllUser = async ()=>{
  const alluser = await userModel.find();

  return alluser;

}

//delete user
module.exports.dltUser= async (id) => {
  const user = await userModel.findOneAndDelete({_id: id});

  return user;

}

module.exports.createmanager = async ({ username, email, password,role }) => {
    if (!username || !email || !password) {
        throw new Error("All Filled Are reqired");
    }
    const user = await userModel.create({ username, email, password,role: "manager"});

    return user;
};