"use server";
import { connectToDb } from "@/lib/mongoose";
import Products from "@/lib/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

type Req = {
	searchString: String;
};

export async function POST(req: Request) {
	const { searchString }: Req = await req.json();
	try {
		connectToDb();
		const searchFor = searchString.replace(/\s/g, "").toLowerCase();
		const products = await Products.find(
			{
				titleID: { $regex: searchFor },
			},
			{ _id: 1, category: 1, title: 1, reviewCounts: 1, image: 1 }
		);
		return NextResponse.json({ message: "OK", products: products });
	} catch (error: any) {
		console.log(`Unable to search the product : ${error.message}`);
	}
}
