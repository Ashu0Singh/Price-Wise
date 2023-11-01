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
		if (existingProduct !== null) {
			const updatedProductPrice: any = [
				...existingProduct.priceHistory,
				{ price: scrapedProduct.currentPrice },
			];
			product = {
				...scrapedProduct,
				priceHistory: updatedProductPrice,
				lowestPrice: getLowestPrice(updatedProductPrice),
				highestPrice: getHighestPrice(updatedProductPrice),
				averagePrice: getAveragePrice(updatedProductPrice),
			};
		}
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
		const products = await Products.find();
		return products;
	} catch (error: any) {
		console.log(`-> Failed to fetch all products : ${error.message}`);
	}
}