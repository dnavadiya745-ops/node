const express = require('express');
const router = express.Router();
const middleware = require("../../../middleware/admin.middleware");
const admincontroller = require("../../../controllers/admin.controller");
const usermiddleware = require("../../../middleware/user.middkeware");
const { body } = require("express-validator");


// show all users
// login user --> check user is admin? --> show all users
router.get('/all/user', middleware.authAdmin, admincontroller.Alluser)

//delete user
router.delete("/user/:id", usermiddleware.authUser, middleware.authAdmin)


// update role -- create manager
// router -- service -- controller -- call into router
router.put("/user/:id/role",usermiddleware.authUser,middleware.authAdmin,admincontroller.updateuserrole);

module.exports = router;