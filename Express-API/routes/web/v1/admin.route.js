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


// manager creation
router.post("/manager/create",
    [
        body('username').isLength({ min: 4 }).withMessage("username must be 4 characters long"),
        body('email').isEmail().withMessage("Enter Valid Email"),
        body('password').isLength({ min: 6 }).withMessage("password must be 4 characters long")],
    usermiddleware.authUser,
    middleware.authAdmin,
    admincontroller.registermanager
);

module.exports = router;