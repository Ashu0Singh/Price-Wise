import React from "react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
	product: Product;
}
const ProductCard = ({ product }: Props) => {
	return (
		<Link href={`/product/${product._id}`} className="product-card">
			<div className="product-card_img-container">
				<Image
					src={product.image}
					alt={product.title}
					width={200}
					height={200}
					className="product-card_image"
				/>
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="product-title">
					{product.title}
				</h3>

			</div>
		</Link>
	);
};

export default ProductCard;
