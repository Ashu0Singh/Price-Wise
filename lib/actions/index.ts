"use server";

import { revalidatePath } from "next/cache";
import Products from "../models/products.model";
import { connectToDb } from "../mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { redirect } from "next/navigation";

const { scrapAmazonProducts } = require("../scraper/index");

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;
	try {
		connectToDb();
		const scrapedProduct = await scrapAmazonProducts(productUrl);
		if (!scrapedProduct) return;
		let product = scrapedProduct;
		const existingProduct = await Products.findOne({
			url: scrapedProduct.url,
		});
		let updatedPriceHistory: any = [];
		if (existingProduct !== null) {
			updatedPriceHistory = [
				...existingProduct.priceHistory,
				{ price: scrapedProduct.currentPrice },
			];
		} else {
			updatedPriceHistory = [
				{ price: scrapedProduct.originalPrice },
				{ price: scrapedProduct.currentPrice },
			];
		}
		product = {
			...scrapedProduct,
			priceHistory: updatedPriceHistory,
			lowestPrice: getLowestPrice(updatedPriceHistory),
			highestPrice: getHighestPrice(updatedPriceHistory),
			averagePrice: getAveragePrice(updatedPriceHistory),
		};
		const newProduct = await Products.findOneAndUpdate(
			{ url: scrapedProduct.url },
			product,
			{
				upsert: true,
				new: true,
			}
		);
		revalidatePath(`/product/${newProduct._id}`);
	} catch (error: any) {
		throw new Error(`Failed to create/update product : ${error.message}`);
	}
}

export async function getProductsById(id: String) {
	try {
		connectToDb();
		const product = await Products.findOne({ _id: id });
		return product;
	} catch (error: any) {
		console.log(`-> Failed to fetch product by Id : ${error.message}`);
	}
}

export async function getAllProducts() {
	try {
		connectToDb();
		const products = await Products.find()
			.sort({ reviewCounts: -1 })
			.limit(12);
		return products;
	} catch (error: any) {
		console.log(`-> Failed to fetch all products : ${error.message}`);
	}
}

export async function getProductsByCategory(category: String) {
	try {
		connectToDb();
		const similarProducts = await Products.find({ category: category })
			.sort("reviewCount")
			.limit(4);
		return similarProducts;
	} catch (error: any) {
		console.log(error.message);
	}
}
