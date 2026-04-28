const cartModel = require("../models/cart.model");

// add items to cart
module.exports.addToCart = async ({ userId, item }) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) cart = new cartModel({ userId, items: [] });

  cart.items.push(item);
  return await cart.save();
};

//get Cart
module.exports.getcart = async (userId) => {
  return await cartModel.find({ userId });
};

// delete single product from cart
module.exports.removesingleProduct = async ({ userId, productId }) => {
  // find login user cart
  let cart = await cartModel.findOne({ userId });

  if (!cart) throw new Error("Cart Not Found...!!!");

  // find index number of product based on productId
  const itemIndex = cart.items.findIndex(
    (i) => i.productId.equals(productId),

    // i --> that give items array
  );

  console.log(itemIndex);

  if (itemIndex === 0) {
    throw new Error("Item Not Found....");
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();
};
