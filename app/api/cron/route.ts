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

export const dynamic = "force-dynamic";
export const revalidate = 10;

export async function GET() {
    try {
        connectToDb();

        const products = await Products.find();
        if (!products) throw new Error("No product found");

        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                try {
                    const scrapedProduct = await scrapAmazonProducts(product.url);
                    if (!scrapedProduct) throw new Error("No product found");

                    const updatedPriceHistory = [
                        ...product.priceHistory,
                        { price: scrapedProduct.currentPrice },
                    ];

                    const updatedProduct = await Products.findOneAndUpdate(
                        { titleID: scrapedProduct.titleID },
                        {
                            ...scrapedProduct,
                            priceHistory: updatedPriceHistory,
                            lowestPrice: getLowestPrice(updatedPriceHistory),
                            highestPrice: getHighestPrice(updatedPriceHistory),
                            averagePrice: getAveragePrice(updatedPriceHistory),
                        }
                    );

                    const emailNotifType = getEmailNotifType(
                        scrapedProduct,
                        updatedProduct
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

                        const userEmails = updatedProduct.users.map(
                            (user: any) => user.email
                        );

                        await sendEmail(emailContent, userEmails);
                    }

                    console.log(updatedProduct?.title);
                    return updatedProduct?._id;
                } catch (error : any) {
                    console.error(`Error processing product: ${error.message}`);
                    return null;
                }
            })
        );

        return NextResponse.json({
            message: "OK",
            products: updatedProducts.filter((id) => id !== null),
        });
    } catch (error : any) {
        console.error(`Error in scheduled job : ${error.message}`);
    }
}
