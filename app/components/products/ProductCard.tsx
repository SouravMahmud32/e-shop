"use client"

import { truncateText } from "@/utils/truncateText";
import Image from "next/image";

interface ProductCardProps{
    data: any
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    return ( 
        <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className=" flex flex-col items-center w-full gap-1">
                <div className=" aspect-square w-full overflow-hidden relative">
                    <Image src={data.images[0].image} className=" w-full h-full object-contain" fill alt={data.name}></Image>
                </div>
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
     );
}
 
export default ProductCard;