import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productmodel.js";

// Function for Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller } = req.body;

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ success: false, message: "Price must be a valid number" });
        }

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: parsedPrice,
            subCategory,
            bestseller: bestseller === "true" || bestseller === true,
            image: imagesUrl,
            date: Date.now(),
        };

        console.log("Product Data:", productData);

        const product = new productModel(productData);
        await product.save();

        console.log("Product Saved:", product);

        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, singleProduct, removeProduct };
