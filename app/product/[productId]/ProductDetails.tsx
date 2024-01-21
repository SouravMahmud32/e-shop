'use client';

import { Rating } from "@mui/material";

interface ProductDetailsProps{
    product: any;
}

const Horizontal = () =>{
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const productRating = product.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / product.reviews.length
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Images</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly></Rating>
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal></Horizontal>
                <div className="text-justify">{product.description}</div>
                <Horizontal></Horizontal>
                <div>
                    <span className=" font-semibold">Category:</span> {product.category}
                </div>
                <div>
                    <span className=" font-semibold">Brand:</span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-green-500' : 'text-red-500'}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <Horizontal></Horizontal>
                <div>Color</div>
                <Horizontal></Horizontal>
                <div>Quantity</div>
                <Horizontal></Horizontal>
                <div>Add to cart</div>
            </div>
        </div>
     );
}
 
export default ProductDetails;