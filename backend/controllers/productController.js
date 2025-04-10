import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productmodel.js";

// Function for Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller } = req.body;

        // Ensure price is a number, parse it explicitly
        const parsedPrice = parseFloat(price); // Use parseFloat for parsing

        if (isNaN(parsedPrice)) {
            return res.status(400).json({ success: false, message: "Price must be a valid number" });
        }

        // Proceed with image handling and other logic as before
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: parsedPrice,  // Use parsed price
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for List Products
const listProducts = async (req, res) => {
    try {
        // Get all products, possibly with pagination and filtering
        const products = await productModel.find();

        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for removing Product
const removeProduct = async (req, res) => {
    try {

         await productModel.findByIdAndDelete(req.body.id)
         res.json({ success: true, message: "Product removed successfully" });



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for Single Product Details
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // Assuming you are passing productId in URL params

        // Find the product by ID
        const product = await productModel.findById(productId);


        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, singleProduct, removeProduct };
