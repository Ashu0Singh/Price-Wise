"use server"

import { connectToDb } from "../mongoose";

const { scrapAmazonProducts } =  require("../scraper/index");

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;
    try {
        connectToDb();
        const scrapedProduct = await scrapAmazonProducts(productUrl);
        if (!scrapedProduct) return;
        console.log(scrapedProduct);
	} catch (error: any) {
		throw new Error(`Failed to create/update product : ${error.message}`);
	}
}
