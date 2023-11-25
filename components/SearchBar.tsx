"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

interface Response {
	id : string
}

const SearchBar = () => {
	const [searchPrompt, setSearchPrompt] = useState(
		""
	);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const isValidAmazonUrl = (url: string) => {
		try {
			const parsedUrl = new URL(url);
			const hostname = parsedUrl.hostname;

			if (
				hostname.includes("amazon.com") ||
				hostname.includes("amazon.") ||
				hostname.endsWith("amazon")
			)
				return true;
		} catch (error) {
			return false;
		}
		return false;
	};
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const isValidUrl = isValidAmazonUrl(searchPrompt);
		if (!isValidUrl) return toast.error("Enter a valid amazon URL");
		try {
			setIsLoading(true);
			const response: Response | undefined = await scrapeAndStoreProduct(searchPrompt);
			router.push(`/product/${response?.id}`);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form
			className="flex flex-col sm:flex-row gap-4 mt-12"
			onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchPrompt}
				onChange={(e) => setSearchPrompt(e.target.value)}
				placeholder="Enter product link"
				className="searchbar-input"
			/>
			<button
				type="submit"
				className="searchbar-btn"
				disabled={searchPrompt === ""}>
				{isLoading ? <Spinner text={"Searching"} /> : "Search"}
			</button>
		</form>
	);
};

export default SearchBar;
