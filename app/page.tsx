import Image from "next/image";
import React from "react";

import SearchBar from "@/components/SearchBar";
import HeroCarousel from "@/components/HeroCarousel";
import { getAllProducts} from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

const Home = async () => {
	const products = await getAllProducts();
	return (
		<>
			<section className="px-6 md:px-20 py-10 md:py-20 pb-0">
				<div className="flex max-xl:flex-col gap-16">
					<div className="flex flex-col justify-center">
						<p className="small-text">
							Smart Shopping Starts Here
							<Image
								src="/assets/icons/arrow-right.svg"
								alt="arrow-right"
								width={14}
								height={14}
							/>
						</p>
						<h1 className="head-text">
							Unleash the Power of
							<span className="text-primary"> PriceWise</span>
						</h1>
						<p className="mt-6">
							Powerful, self-serve product and growth analytics to
							help you convert, engage, and retain more
						</p>
						<SearchBar />
					</div>
					<HeroCarousel />
				</div>
			</section>
			<section className="trending-section">
				<h2 className="section-text">Trending Products</h2>
				<div className="flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-8 sm:gap-y-16">
					{products?.map((product: any) => {
						return (
							<ProductCard key={product._id} product={product} />
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Home;
