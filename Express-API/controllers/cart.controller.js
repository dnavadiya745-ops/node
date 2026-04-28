const cartModel = require("../models/cart.model");
const cartService = require("../services/cart.service");


// Add To Cart
module.exports.AddToCart = async(req,res)=>{
   try {
    const userId = req.user.id;
    const {item} = req.body;
  
    const exist = await cartModel.findOne({userId});
    const existProduct = exist.items.map((val) => {
      const ids = val.productId;
      return ids;
    });

    existProduct.forEach((e) => {
         if(e.equals(item.productId)){
          return res.status(400).json({message: "Product Already Is Add into Cart"})
         } 
    });

     const cart = await cartService.addToCart({userId, item});

     return  res.status(200).json({message: "Add To Cart Successfully......!!",cart});
   } catch (error) {
     return res.status(400).json({message: error.message});
   }
}

// Get Cart
module.exports.getCart = async(req,res) => {
  try {
    
     const userId = req.user.id;
     let cart = await cartService.getcart(userId);

     if (!cart) {
      return res.status (404).json("Cart Not Found.....!!!!");
     }

     return res.status(200).json({message: "Cart Fetch Successfully...!!!",cart});

  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

// remove single item from cart
module.exports.removeItem = async (req,res) => {
  try {
    
    const userId = req.user.id;
    const productId = req.params.id;

    await cartService.removesingleProduct({userId, productId});

    return res.status(200).json({message:"Remove Item From Cart Successfully....!!!!"});

  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}