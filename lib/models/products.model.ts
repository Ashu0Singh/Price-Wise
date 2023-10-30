import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    currenctPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
});