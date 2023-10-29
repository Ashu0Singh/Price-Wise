"use server"
const { scrapAmazonProducts } =  require("../scraper/index");

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;
	try {
        const scrapedProduct = await scrapAmazonProducts(productUrl);
        console.log(scrapedProduct);
	} catch (error: any) {
		throw new Error(`Failed to create/update product : ${error.message}`);
	}
}
