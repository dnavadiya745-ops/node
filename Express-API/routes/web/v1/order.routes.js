const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middleware/user.middkeware")
const orderController = require("../../../controllers/order.controller")


// create order
router.post("/add" , userMiddleware.authUser , orderController.CreateOrder)

// get order -- show history or recent order
router.get("/all" , userMiddleware.authUser , orderController.GetOrder)


// cancel order

module.exports = router ;