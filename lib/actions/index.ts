"use server";

import { revalidatePath } from "next/cache";
import Products from "../models/products.model";
import { connectToDb } from "../mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

const { scrapAmazonProducts } = require("../scraper/index");

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;
	try {
		connectToDb();
		const scrapedProduct = await scrapAmazonProducts(productUrl);
		if (!scrapedProduct) return;
		let product = scrapedProduct;
		const existingProduct = await Products.findOne({ url: scrapedProduct.url });
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
			console.log(product);
		}
		const newProduct = await Products.findOneAndUpdate(
			{ url: scrapedProduct.url },
			product,
			{
				upsert: true,
				new: true,
			}
		);
		revalidatePath(`/products/${newProduct._id}`);
	} catch (error: any) {
		throw new Error(`Failed to create/update product : ${error.message}`);
	}
}
