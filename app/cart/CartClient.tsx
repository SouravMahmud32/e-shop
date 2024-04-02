"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";

const CartClient = () => {
  const { cartProducts } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className=" text-2xl">Your Cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className=" text-slate-500 gap-1 flex items-center mt-2"
          >
            <MdArrowBack></MdArrowBack>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center></Heading>
      <div className=" grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className=" col-span-2 justify-start">Product</div>
        <div className=" justify-self-center">Price</div>
        <div className=" justify-self-center">Quantity</div>
        <div className=" justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <div key={item.id}>{item.name}</div>;
          })}
      </div>
      <div className=" border-t-[1.5px] border-e-slate-200 py4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={() => {}} small outline></Button>
        </div>
        <div className=" text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>$1,000</span>
          </div>
          <p className=" text-slate-500">Taxes and shipping calculate at checkout</p>
          <Button label="Checkout" onClick={() =>{}}></Button>
          <Link
            href={"/"}
            className=" text-slate-500 gap-1 flex items-center mt-2"
          >
            <MdArrowBack></MdArrowBack>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
