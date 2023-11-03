import { getProductsById } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Product = async ({ params }: { params: { id: String } }) => {
	const product: Product = await getProductsById(params.id);
	if (!product) return redirect("/");
	return (
		<div className="product-container">
			<div className="flex gap-10 xl:gap-28 xl:flex-row flex-col">
				<div className="product-image">
					<Image
						src={product.image}
						alt={product.title}
						width={580}
						height={400}
						className="mx-auto"
					/>
				</div>
				<div className="flex-1 flex flex-col">
					<div className="flex justify-between items-start gap-5 flex-wrap pb-6">
						<div className="flex flex-col gap-3">
							<p className="text-[24px] text-secondary font-semibold">
								{product.title}
							</p>
							<Link
								href={product.url}
								target="_blank"
								className="text-base text-black opacity-50">
								Visit Product
							</Link>
						</div>
						<div className="flex items-center gap-3">
							<div className="product-hearts">
								<Image
									src={"/assets/icons/red-heart.svg"}
									alt="Heart"
									width={20}
									height={20}
								/>
								<p className="text-base font-semibold text-[#D46F77]">
									{product.reviewCounts}
								</p>
							</div>
							<div className="p-2 bg-white-200 rounded-10">
								<Image
									src="/assets/icons/bookmark.svg"
									alt="Wishlist"
									width={20}
									height={20}
								/>
							</div>
							<div className="p-2 bg-white-200 rounded-10">
								<Image
									src="/assets/icons/share.svg"
									alt="Share"
									width={20}
									height={20}
								/>
							</div>
						</div>
					</div>
					<div className="product-info">
						<div className="flex flex-col gap-2">
							<p className="text-[28px] text-secondary font-bold">
								{product.currency}{" "}
								{formatNumber(product.currentPrice)}
							</p>
							<p className="text-[21px] text-black opacity-50 line-through">
								{product.currency}{" "}
								{formatNumber(product.originalPrice)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
