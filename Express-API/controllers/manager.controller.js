const { validationResult } = require("express-validator");
const managerModel = require("../models/manager.model");
const managerService = require("../services/manager.service");


// create manager
module.exports.registerManager = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { username, email, password, rights } = req.body;

    const exist = await managerModel.findOne({ email: email });
    if (exist) {
        return res.status(400).json({ message: "Email already exists" });
    }

    
}