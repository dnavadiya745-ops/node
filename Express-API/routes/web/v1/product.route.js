// product creation
// product read single and all
// product update
// product delete

const express = require("express");
const UserMiddleware = require("../../../middleware/user.middkeware");
const AdminMiddleware = require("../../../middleware/admin.middleware");
const ProductController = require("../../../controllers/product.controller");
const router = express.Router();

// Create Product
router.post("/add", UserMiddleware.authUser, AdminMiddleware.authAdmin, ProductController.createProduct);

//authuser --> check user login or not --> if login then --> req.user(give you back)
//authadmin --> req.user --> check role --> admin or not --> jump to next router

//all product
router.get("/all", UserMiddleware.authUser, AdminMiddleware.authAdmin, ProductController.allProduct);

// single product
router.get("/:id", UserMiddleware.authUser, AdminMiddleware.authAdmin, ProductController.singleProduct);

//update product
router.put("/:id", UserMiddleware.authUser, AdminMiddleware.authAdmin, ProductController.updateProduct);

//delete product
router.delete("/:id", UserMiddleware.authUser, AdminMiddleware.authAdmin, ProductController.deleteProduct);

module.exports = router;