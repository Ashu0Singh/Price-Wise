import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		url: { type: String, required: true, unique: true },
		currency: { type: String, required: true },
		title: { type: String, required: true },
		image: { type: String, required: true },
		currentPrice: { type: Number, required: true },
		originalPrice: { type: Number, required: true },
		priceHistory: [
			{
				price: { type: Number, required: true },
				date: { type: Date, default: Date.now },
			},
		],
		stars: { type: Number },
		lowestPrice: { type: Number },
		highestPrice: { type: Number },
		averagePrice: { type: Number },
		discountRate: { type: Number },
		description: [{ type: String }],
		category: { type: String },
		reviewCounts: { type: Number },
		isOutOfStock: { type: Boolean },
		users: [{ email: { type: String, required: true } }],
	},
	{ timestamps: true }
);

const Products =
	mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Products;
