const wishlistService = require("../services/wishlist.service")

// add item to wishlist 
module.exports.AddWishlist = async (req , res) =>{
    try {
        const userId = req.user.id;
        const {item} = req.body;

        const wishlist = await wishlistService.AddToWishlist({userId , item})

        if (!wishlist) {
            return res.status(404).json({message: "Wishlist Not Found"})
        }

        return res.status(200).json({message: "Add items into Successfully" , wishlist})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

