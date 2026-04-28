// show all user logic

const userModel = require("../models/user.model");

//get all user
module.exports.getAllUser = async () => {
  const alluser = await userModel.find();

  return alluser;

}

//delete user
module.exports.dltUser = async (id) => {
  const user = await userModel.findOneAndDelete({ _id: id });

  return user;

}

// update role
module.exports.updateuserrole = async ({ userId, role }) => {
  return await userModel.findOneAndUpdate({ _id: userId }, { role }, { new: true });
};