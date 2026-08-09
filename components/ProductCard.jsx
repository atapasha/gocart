"use client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const currency = "ریال";

  // calculate the average rating of the product
  // const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

  const rating = 0;
  return (
    <Link href={`/product/${product.id}`} className="group max-xl:mx-auto">
      {/* 
        ۱. کادر والد را relative و overflow-hidden می‌کنیم.
        ۲. اندازه دلخواه (مثل sm:w-60 sm:h-68) را به والد می‌دهیم.
        ۳. aspect-square یا طول/عرض ثابت برای اندازه کادر استفاده کنید.
      */}
      <div 
        id="image-container" 
        className="bg-[#F5F5F5] relative w-full aspect-square sm:w-60 sm:h-68 rounded-lg overflow-hidden flex items-center justify-center"
      >
        {/* 
          ۴. از fill={true} استفاده کنید تا عکس تمام فضای والد (image-container) را پر کند.
          ۵. object-cover یا object-contain (بسته به نیاز) برای نوعِ پر کردن استفاده کنید.
          ۶. کلاس‌های انیمیشن و w-full h-full را مستقیم به خود عکس بدهید.
          ۷. وقتی fill استفاده می‌کنید، نیازی به width/height نیست.
        */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill={true}
          className="object-cover w-full h-full group-hover:scale-115 transition-transform duration-300"
        />
      </div>
      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60">
        <div>
          <p>{product.name}</p>
          <div className="flex">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent mt-0.5"
                  fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
          </div>
        </div>
        <div className="flex items-center gap-1 text-base font-bold whitespace-nowrap">
          <span dir="ltr">{product.price?.toLocaleString()}</span>
          <span className="text-xs font-normal text-slate-500">{currency}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;