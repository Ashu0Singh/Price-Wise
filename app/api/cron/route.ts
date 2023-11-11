import Products from "@/lib/models/products.model";
import { connectToDb } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapAmazonProducts } from "@/lib/scraper";
import {
	getAveragePrice,
	getEmailNotifType,
	getHighestPrice,
	getLowestPrice,
} from "@/lib/utils";
import { Product } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
	try {
		connectToDb();
		const products = await Products.find();
		if (!products) throw new Error("No product found");

		//1. Scraping latest product details and updated db

        const updatedProducts = Promise.all(
            products.map(async (product) => {
                const scrapedProduct = await scrapAmazonProducts(product.url);
                if (!scrapedProduct) throw new Error("No product found");
                let updatedPriceHistory: any = [];
                if (product !== null) {
                    updatedPriceHistory = [
                        ...product.priceHistory,
                        { price: scrapedProduct.currentPrice },
                    ];
                    product = {
                        ...scrapedProduct,
                        priceHistory: updatedPriceHistory,
                        lowestPrice: getLowestPrice(updatedPriceHistory),
                        highestPrice: getHighestPrice(updatedPriceHistory),
                        averagePrice: getAveragePrice(updatedPriceHistory),
                    };
                    const updatedProduct: Product | null =
                        await Products.findOneAndUpdate(
                            { titleID: scrapedProduct.titleID },
                            product
                        );
                    const emailNotifType = getEmailNotifType(
                        scrapedProduct,
                        product
                    );
                    if (emailNotifType && updatedProduct?.users) {
                        const productInfo = {
                            title: updatedProduct.title,
                            url: updatedProduct.url,
                        };
                        const emailContent = await generateEmailBody(
                            productInfo,
                            emailNotifType
                        );
                        const userEmails = updatedProduct.users?.map(
                            (user: any) => user.email
                        );
                        await sendEmail(emailContent, userEmails);
                    }
                    return updatedProduct;
                }
            })
		);
		return NextResponse.json({
			message: "OK",
		});
	} catch (error: any) {
		console.log(`Error in scheduled job : ${error.message}`);
	}
}
