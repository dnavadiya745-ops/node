const ProductModel = require("../models/product.model");

//create Product
module.exports.createProduct = async ({ name, description, stock, price, discount, isNewProduct, sku, images, brand, category }) => {
     if(!name || !description || !stock || !price || !sku || !images || !brand || !category){
        throw new Error ("All Feild Are Required !!");
     }

     let product = await ProductModel.create({name, description, stock, price, discount, isNewProduct, sku, images, brand, category});

     return product;
};

// get single product
module.exports.singleProduct = async (id) => {
    const product = await ProductModel.findOne({_id: id});
    return product;
};

// all product 
module.exports.AllProduct = async () => {
    const allProduct = await ProductModel.find();
    return allProduct;
};

// update product
module.exports.UpdateProducts = async ({ProductID, name, description, stock, price, discount, isNewProduct, sku, images, brand, category}) =>{
    const updateProducts = await ProductModel.findOneAndUpdate({_id: ProductID}, {name, description, stock, price, discount, isNewProduct, sku, images, brand, category}, {new: true});

    if(!updateProducts){
        throw new Error ("Product Not Found");
    }

    return updateProducts;
};

// delete product
module.exports.DeleteProduct = async (id) => {
    return await ProductModel.findOneAndDelete({ _id: id });
};