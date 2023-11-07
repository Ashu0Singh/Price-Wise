"use server";

import { revalidatePath } from "next/cache";
import Products from "../models/products.model";
import { connectToDb } from "../mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { redirect } from "next/navigation";
import { EmailContent, Product } from "@/types";
import { User } from "@/types";
import { generateEmailBody } from "../nodemailer";

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
		revalidatePath(`/`);
		revalidatePath(`/product/${newProduct._id}`);
		return { id: newProduct._id.valueOf() };
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
			.sort({ reviewCounts: -1 })
			.limit(4);
		return similarProducts;
	} catch (error: any) {
		console.log(error.message);
	}
}

export async function addUserEmailToProduct(productId: String, email: String) {
	try {
		connectToDb();
		const product: Product = await getProductsById(productId);
		if (!product) return 400;

		const userExist = product.users?.some(
			(user: User) => user.email === email
		);
		if (!userExist) {
			await Products.findOneAndUpdate(
				{ _id: productId },
				{ $push: { users: { email } } }
			);
			// const emailContent = generateEmailBody(product, email);
		}
		return;
	} catch (error: any) {
		console.log(`Unable to add user email to product : ${error.message}`);
	}
}

export async function getAllProductsID() {
	connectToDb();
	const productIds = await Products.find({}, { _id: 1 });
	const ids = Promise.resolve(
		productIds.map((product) => product._id.toString())
	);
	return ids;
}
