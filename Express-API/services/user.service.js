const userModel = require("../models/user.model");

// when create a service -- when you want to change into database

// third validation --> check all field are not blank

module.exports.createUser = async ({ username, email, password,role }) => {
    if (!username || !email || !password) {
        throw new Error("All Filled Are reqired");
    }
    const user = await userModel.create({ username, email, password,role});

    return user;
};

// update data
module.exports.updateUser = async ({ userId, username, email }) => {

    const updateUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { username, email },
        { new: true }

    )
    if (!updateUser) {
        throw new Error("user not found");
    }
    return updateUser;
};