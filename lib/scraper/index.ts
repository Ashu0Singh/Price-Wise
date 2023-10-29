import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice, getImageArray } from "../utils";

export const scrapAmazonProducts = async (productUrl: string) => {
	const username = String(process.env.BRIGHT_DATA_USERNAME);
	const password = String(process.env.PASSWORD);
	const port = 22225;
	const sessionID = (1000000 * Math.random()) | 0;
	const option = {
		auth: {
			username: `${username}-session-${sessionID}`,
			password,
		},
		host: "brd.superproxy.io",
		port,
		rejectUnauthorized: false,
	};

	try {
		const response = await axios.get(productUrl, option);
		const $ = cheerio.load(response.data);
		const productTitle = $("#productTitle").text().trim();
		const currentPrice = extractPrice($("span.a-price-whole").eq(1));
		const originalPrice = extractPrice(
			$("span.a-text-price > span.a-offscreen")
		);

		const images = getImageArray($("#landingImage"));
		const currency = extractCurrency($(".a-price-symbol"));
		const outOfStock =
			$("#availability > span").text().trim().toLowerCase() !==
			"in stock";
		const discountPercentage = $(".savingsPercentage")
			.text()
			.replace(/[-%]/, "");
        const data = {
            url : productUrl,
			title : productTitle,
			currentPrice : Number(currentPrice),
			originalPrice : Number(originalPrice),
			image : images,
			isOutOfStock : outOfStock,
			currency : currency || '₹',
			discountPercentage,
        };
        return data;
	} catch (error: any) {
		throw new Error(`Failed to scrap product : ${error.message}`);
	}
};
