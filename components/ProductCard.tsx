"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const stock = product?.stock as number;

  return (
    <div className="group relative flex flex-col justify-between border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden h-full">
      {/* PRODUCT IMAGE */}
      <div className="relative bg-shop_light_bg flex items-center justify-center h-56">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product?.name || "Product"}
              width={350}
              height={350}
              priority
              className={`w-full h-56 object-contain transition-transform duration-500 ${
                stock > 0
                  ? "group-hover:scale-105"
                  : "opacity-60 grayscale cursor-not-allowed"
              }`}
            />
          </Link>
        )}

        {/* Sale / Deal tag */}
        {product?.status === "sale" ? (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-shop_light_green to-shop_dark_green text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow">
            SALE
          </span>
        ) : (
          <Link
            href="/deal"
            className="absolute top-1.5 left-1.5 border border-shop_orange/50 p-1 rounded-full hover:border-shop_orange transition"
          >
            <Flame
              size={14}
              fill="#fb6c08"
              className="text-shop_orange/70 group-hover:text-shop_orange transition"
            />
          </Link>
        )}

        {/* Wishlist / Compare */}
        <ProductSideMenu product={product} />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col justify-between flex-grow p-3">
        <div className="flex flex-col gap-1 min-h-[110px]">
          {/* Category */}
          {product?.categories && (
            <p className="uppercase text-[11px] text-gray-500 tracking-wide line-clamp-1">
              {product.categories.join(", ")}
            </p>
          )}

          {/* Title */}
          <Title className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-shop_dark_green transition">
            {product?.name}
          </Title>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={
                    index < 4 ? "text-shop_light_green" : "text-gray-300"
                  }
                  fill={index < 4 ? "#93D991" : "#ccc"}
                  width={12}
                  height={12}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500">5 Reviews</span>
          </div>

          {/* Stock */}
          <div className="flex items-center justify-between text-[11px] mt-0.5">
            <span className="font-medium text-gray-600">Availability</span>
            <span
              className={`font-semibold ${
                stock > 0
                  ? "text-shop_dark_green"
                  : "text-red-600 line-through opacity-60"
              }`}
            >
              {stock > 0 ? `${stock}` : "Out"}
            </span>
          </div>
        </div>

        {/* PRICE & BUTTON */}
        <div className="mt-auto space-y-2">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-sm font-semibold text-gray-800"
          />

          <AddToCartButton
            product={product}
            variant="wishlist"
            className="w-full py-2 text-xs rounded-full font-semibold shadow-sm hover:shadow-md transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import { Product } from "@/sanity.types";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import { StarIcon } from "@sanity/icons";
// import { Flame } from "lucide-react";
// import PriceView from "./PriceView";
// import Title from "./Title";
// import ProductSideMenu from "./ProductSideMenu";
// import AddToCartButton from "./AddToCartButton";

// const ProductCard = ({ product }: { product: Product }) => {
//   return (
//     <div className="text-sm border-[1px] rounded-lg border-darkBlue/20 group bg-white hover:shadow-lg hover:shadow-shop_light_green/10 transition-all duration-300">
//       <div className="relative group overflow-hidden bg-shop_light_bg rounded-t-lg">
//         {product?.images && (
//           <Link href={`/product/${product?.slug?.current}`}>
//             <Image
//               src={urlFor(product.images[0]).url()}
//               alt="productImage"
//               width={500}
//               height={500}
//               priority
//               className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500
//               ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
//             />
//           </Link>
//         )}
//         <ProductSideMenu product={product} />

//         {/* Badge */}
//         {product?.status === "sale" ? (
//           <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//             Sale!
//           </div>
//         ) : (
//           <Link
//             href={"/deal"}
//             className="absolute top-2 left-2 z-10 bg-shop_orange/90 p-1.5 rounded-full group-hover:bg-shop_orange hover:scale-110 transition-all shadow-md"
//           >
//             <Flame size={18} fill="white" className="text-white" />
//           </Link>
//         )}

//         {/* Out of Stock Overlay */}
//         {product?.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
//             <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
//               <p className="font-bold text-red-600">Out of Stock</p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-3 flex flex-col gap-2.5">
//         {/* Category */}
//         {product?.categories && (
//           <p className="uppercase line-clamp-1 text-xs font-medium text-shop_dark_green/70 tracking-wide">
//             {product.categories.map((cat) => cat).join(", ")}
//           </p>
//         )}

//         {/* Product Name */}
//         <Link href={`/product/${product?.slug?.current}`}>
//           <Title className="text-sm line-clamp-2 hover:text-shop_dark_green transition-colors min-h-[40px]">
//             {product?.name}
//           </Title>
//         </Link>

//         {/* Rating */}
//         <div className="flex items-center gap-2">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, index) => (
//               <StarIcon
//                 key={index}
//                 className={
//                   index < 4 ? "text-shop_light_green" : "text-lightText"
//                 }
//                 fill={index < 4 ? "#93D991" : "#ababab"}
//               />
//             ))}
//           </div>
//           <p className="text-lightText text-xs tracking-wide">(5 Reviews)</p>
//         </div>

//         {/* Stock Status */}
//         <div className="flex items-center gap-2">
//           <div
//             className={`w-2 h-2 rounded-full ${
//               product?.stock === 0
//                 ? "bg-red-500"
//                 : (product?.stock as number) <= 5
//                   ? "bg-orange-500 animate-pulse"
//                   : "bg-green-500"
//             }`}
//           />
//           <p className="text-xs font-medium">
//             {product?.stock === 0 ? (
//               <span className="text-red-600">Out of Stock</span>
//             ) : (product?.stock as number) <= 5 ? (
//               <span className="text-orange-600">
//                 Only {product?.stock} left
//               </span>
//             ) : (
//               <span className="text-green-600">
//                 In Stock ({product?.stock})
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Price */}
//         <PriceView
//           price={product?.price}
//           discount={product?.discount}
//           className="text-sm"
//         />

//         {/* Add to Cart Button */}
//         <AddToCartButton
//           product={product}
//           variant="compact"
//           showSubtotal={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
