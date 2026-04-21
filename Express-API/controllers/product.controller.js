const productService = require("../services/product.service");
const ProductModel = require("../models/product.model");

// add new Products
module.exports.createProduct = async (req, res) => {
    const { name, description, stock, price, discount, isNewProduct, sku, images, brand, category } = req.body;

    const isExist = await ProductModel.findOne({ sku: sku });

    if (isExist) {
        return res.status(400).json({ message: "Product Already Registerd" });
    }

    const product = await productService.createProduct({ name, description, stock, price, discount, isNewProduct, sku, images, brand, category });

    return res.status(200).json({ message: "Product Added Successfully", product });
};

// single products
module.exports.singleProduct = async (req, res) => {
    try {
        const product = await productService.singleProduct(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found !!" });
        }
        return res.status(200).json({ message: "Product Found !!", product });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// all products
module.exports.allProduct = async (req, res) => {
    try {
        const products = await productService.AllProduct();

        if (!products) {
            return res.status(404).json({ message: "Products Is Not Found" });
        }
        return res.status(200).json({ message: "Fetch All Products:", products });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// update Product
module.exports.updateProduct = async (req, res) => {
    const ProductID = req.params.id;
    const { name, description, stock, price, discount, isNewProduct, sku, images, brand, category } = req.body;

    const updatedproduct = await productService.UpdateProducts({
       ProductID, name, description, stock, price, discount, isNewProduct, sku, images, brand, category
    });

    return res.status(200).json({ message: "User Update Successfully", updatedproduct });
};

//delete product
module.exports.deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;

        const deleteProduct = await productService.DeleteProduct(productID);

        if(!deleteProduct){
            return res.status(404).json({ message: "Product Not Found !!"});
        }

        return res.status(200).json({ message: "Product Delete Successfully "});
    } catch (error) {
       return res.status(400).json({ message: error.message }); 
    }

};