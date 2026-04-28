const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middleware/user.middkeware");
const cartController = require("../../../controllers/cart.controller")


// add items
router.post("/add",userMiddleware.authUser,cartController.AddToCart)

// get all items
router.get("/all",userMiddleware.authUser,cartController.getCart);

// remove single items from cart
router.delete("/product/:id",userMiddleware.authUser,cartController.removeItem)

// remove all item from cart --> empty cart

module.exports = router;