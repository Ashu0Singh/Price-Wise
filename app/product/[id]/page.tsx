import { getProductsById } from "@/lib/actions";
import React from "react";

const Product = async ({ params }: { params: { id: String } }) => {
    try {
        const product = await getProductsById(params.id);
        return <div>{product.url}</div>;
    } catch (error) {
        console.log(error);
    }
};

export default Product;
