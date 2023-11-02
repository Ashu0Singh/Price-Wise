import { getProductsById } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Product = async ({ params }: { params: { id: String } }) => {
	const product = await getProductsById(params.id);

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
                            <Link href={product.url}
                                target="_blank"
                                className="text-base text-black opacity-50">Visit Product</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
