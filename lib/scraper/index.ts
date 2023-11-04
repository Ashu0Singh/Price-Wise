import axios from "axios";
import * as cheerio from "cheerio";
import {
	extractCategory,
	extractCurrency,
	extractDescription,
	extractPrice,
	extractStars,
	getImageArray,
} from "../utils";

import chromium from "chrome-aws-lambda";
// import puppeteer from "puppeteer-core";

export const scrapAmazonProducts = async (productUrl: string) => {
	// const username = String(process.env.BRIGHT_DATA_USERNAME);
	// const password = String(process.env.PASSWORD);
	// const port = 22225;
	// const sessionID = (1000000 * Math.random()) | 0;
	// const option = {
	// 	auth: {
	// 		username: `${username}-session-${sessionID}`,
	// 		password,
	// 	},
	// 	host: "brd.superproxy.io",
	// 	port,
	// 	rejectUnauthorized: false,
	// };

	try {
		// const response = await axios.get(productUrl, option);
		// const $ = cheerio.load(response.data);
		const browser = await chromium.puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		});

		const page = await browser.newPage();
		await page.goto(`${productUrl}`);

		const body = await page.content();
		browser.close();
		const $ = cheerio.load(body);
		const productTitle = $("#productTitle").text().trim();
		const currentPrice = extractPrice($("span.a-price-whole").eq(1));
		const originalPrice = extractPrice(
			$("span.basisPrice > span.a-price.a-text-price > span.a-offscreen")
		);
		const stars = extractStars(
			$("i.cm-cr-review-stars-spacing-big > span.a-icon-alt")
		);

		const images = getImageArray($("img#landingImage"));
		const currency = extractCurrency($(".a-price-symbol"));
		const outOfStock =
			$("#availability > span").text().trim().toLowerCase() !==
			"in stock";
		const discountRate = $(".savingsPercentage")
			.text()
			.replace(/[-%]/g, "");
		const reviewCounts = $("span#acrCustomerReviewText.a-size-base")
			.eq(1)
			.text()
			.trim()
			.replace(/[^0-9]+/g, "");
		const description = extractDescription(
			$(
				"div#feature-bullets.a-section.a-spacing-medium.a-spacing-top-small > ul > li > span.a-list-item"
			)
		);
		const category = extractCategory($("a.a-color-tertiary").last());
		const data = {
			url: productUrl,
			title: productTitle,
			currentPrice: Number(currentPrice),
			originalPrice: originalPrice
				? Number(originalPrice)
				: Number(currentPrice),
			image: images[0],
			isOutOfStock: outOfStock,
			currency: currency || "₹",
			discountRate: discountRate ? Number(discountRate) : 0,
			reviewCounts,
			stars,
			category,
			description,
			lowestPrice: Number(currentPrice) || Number(originalPrice),
			highestPrice: Number(originalPrice) || Number(currentPrice),
			averagePrice: Number(currentPrice) || Number(originalPrice),
		};
		return data;
	} catch (error: any) {
		throw new Error(`Failed to scrap product : ${error.message}`);
	}
};
