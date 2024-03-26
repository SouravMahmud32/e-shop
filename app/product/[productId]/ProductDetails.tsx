"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const {cartTotalQty} = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  // console.log(cartProduct);
  // console.log(cartTotalQty);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() =>{
    if(cartProduct.quantity === 0){
      return;
    }
    setCartProduct((prev) =>{
      return{...prev, quantity: ++prev.quantity}
    })
  }, [cartProduct])


  const handleQtyDecrease = useCallback(() =>{
    if(cartProduct.quantity ===1){
      return;
    }
    setCartProduct((prev) =>{
      
      return{...prev, quantity: --prev.quantity}
    })
  }, [cartProduct])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}></ProductImage>
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
        <div className={product.inStock ? "text-green-500" : "text-red-500"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal></Horizontal>
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        ></SetColor>
        <Horizontal></Horizontal>
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        ></SetQuantity>
        <Horizontal></Horizontal>
        <div className="max-w-[300px]">
          <Button label="Add To Cart" onClick={() =>{}}></Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
