const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middleware/user.middkeware")
const wishlistController = require("../../../controllers/wishlist.controller")



// add into wishlist
router.post("/add" , userMiddleware.authUser , wishlistController.AddWishlist)


// remove items from wishlist


module.exports = router