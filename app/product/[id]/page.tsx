import PriceInfoComponent from "@/components/PriceInfoComponent";
import ProductCard from "@/components/ProductCard";
import {
	getAllProductsID,
	getProductsByCategory,
	getProductsById,
} from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import TrackPrice from "@/components/TrackPrice";

export const revalidate = 3600;

export async function generateStaticParams() {
	const ids = await getAllProductsID();
	return ids.map((id) => ({ id: id }));
}

const Product = async ({ params }: { params: { id: String } }) => {
	const product: Product = await getProductsById(params.id);
	let id = 1;
	if (!product) return redirect("/");
	const similarProducts: any = await getProductsByCategory(product.category);
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
								{product.currency} {product.originalPrice}
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex gap-3">
								<div className="product-stars">
									<Image
										src={"/assets/icons/star.svg"}
										alt="Rating"
										width={16}
										height={16}
									/>
									<p className="text-sm text-primary-orange font-semibold">
										{product.stars}
									</p>
								</div>
								<div className="product-reviews">
									<Image
										src={"/assets/icons/comment.svg"}
										alt="Comments"
										width={16}
										height={16}
									/>
									<p className="text-sm text-secondary font-semibold">
										{product.reviewCounts} Reviews
									</p>
								</div>
							</div>
							<p className="text-sm text-black opacity-50">
								<span className="text-primary-green font-semibold">
									93%
								</span>{" "}
								of buyers have recommended
							</p>
						</div>
					</div>
					<div className="my-7 flex flex-col gap-5">
						<div className="flex gap-5 flex-wrap">
							<PriceInfoComponent
								title={"Current Price"}
								iconSrc={"/assets/icons/price-tag.svg"}
								value={`${product.currency} ${formatNumber(
									product.currentPrice
								)}`}
								borderColor="#b6dbff"
							/>
							<PriceInfoComponent
								title={"Average Price"}
								iconSrc={"/assets/icons/chart.svg"}
								value={`${product.currency} ${formatNumber(
									product.averagePrice
								)}`}
								borderColor="#b6dbff"
							/>
							<PriceInfoComponent
								title={"Highest Price"}
								iconSrc={"/assets/icons/arrow-up.svg"}
								value={`${product.currency} ${formatNumber(
									product.highestPrice
								)}`}
								borderColor="#b6dbff"
							/>
							<PriceInfoComponent
								title={"Lowest Price"}
								iconSrc={"/assets/icons/arrow-down.svg"}
								value={`${product.currency} ${formatNumber(
									product.lowestPrice
								)}`}
								borderColor="#b6dbff"
							/>
						</div>
					</div>
					<div className="flex flex-row gap-5 md:gap-10 flex-wrap">
						<TrackPrice productId={params.id} />
						<button className="btn grow mx-auto flex items-center justify-center gap-3 min-w-[200px] bg-primary">
							<Image
								src="/assets/icons/bag.svg"
								alt="Buy Now"
								width={22}
								height={22}
							/>
							<Link href={"/"} className="text-base text-white">
								Buy Now
							</Link>
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-5">
					<h3 className="text-2xl text-secondary font-semibold">
						Product Description
					</h3>
					<ol className="flex list-disc flex-col gap-3 px-5">
						{product?.description.map((text) => {
							return <li key={id++}>{text}</li>;
						})}
					</ol>
				</div>
			</div>
			{similarProducts && similarProducts?.length > 1 && (
				<div className="py-5 flex flex-col gap-2 w-full">
					<p className="section-text">Similar Product</p>
					<div className="flex flex-wrap gap-8 mt-2 w-full">
						{similarProducts.map((prod: Product) => {
							if (prod.url == product.url) return;
							return (
								<ProductCard key={prod._id} product={prod} />
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Product;
