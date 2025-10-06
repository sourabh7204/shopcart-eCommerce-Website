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
//     <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
//       <div className="relative group overflow-hidden bg-shop_light_bg">
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
//         {product?.status === "sale" ? (
//           <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect">
//             Sale!
//           </p>
//         ) : (
//           <Link
//             href={"/deal"}
//             className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
//           >
//             <Flame
//               size={18}
//               fill="#fb6c08"
//               className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
//             />
//           </Link>
//         )}
//       </div>
//       <div className="p-3 flex flex-col gap-2">
//         {product?.categories && (
//           <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
//             {product.categories.map((cat) => cat).join(", ")}
//           </p>
//         )}
//         <Title className="text-sm line-clamp-1">{product?.name}</Title>
//         <div className="flex items-center gap-2">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, index) => (
//               <StarIcon
//                 key={index}
//                 className={
//                   index < 4 ? "text-shop_light_green" : " text-lightText"
//                 }
//                 fill={index < 4 ? "#93D991" : "#ababab"}
//               />
//             ))}
//           </div>
//           <p className="text-lightText text-xs tracking-wide">5 Reviews</p>
//         </div>

//         <div className="flex items-center gap-2.5">
//           <p className="font-medium">In Stock</p>
//           <p
//             className={`${product?.stock === 0 ? "text-red-600" : "text-shop_dark_green/80 font-semibold"}`}
//           >
//             {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
//           </p>
//         </div>

//         <PriceView
//           price={product?.price}
//           discount={product?.discount}
//           className="text-sm"
//         />
//         <AddToCartButton product={product} className="w-36 rounded-full" />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-lg border-darkBlue/20 group bg-white hover:shadow-lg hover:shadow-shop_light_green/10 transition-all duration-300">
      <div className="relative group overflow-hidden bg-shop_light_bg rounded-t-lg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />

        {/* Badge */}
        {product?.status === "sale" ? (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Sale!
          </div>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 bg-shop_orange/90 p-1.5 rounded-full group-hover:bg-shop_orange hover:scale-110 transition-all shadow-md"
          >
            <Flame size={18} fill="white" className="text-white" />
          </Link>
        )}

        {/* Out of Stock Overlay */}
        {product?.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
              <p className="font-bold text-red-600">Out of Stock</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        {/* Category */}
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-shop_dark_green/70 tracking-wide">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="text-sm line-clamp-2 hover:text-shop_dark_green transition-colors min-h-[40px]">
            {product?.name}
          </Title>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-shop_light_green" : "text-lightText"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">(5 Reviews)</p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              product?.stock === 0
                ? "bg-red-500"
                : (product?.stock as number) <= 5
                  ? "bg-orange-500 animate-pulse"
                  : "bg-green-500"
            }`}
          />
          <p className="text-xs font-medium">
            {product?.stock === 0 ? (
              <span className="text-red-600">Out of Stock</span>
            ) : (product?.stock as number) <= 5 ? (
              <span className="text-orange-600">
                Only {product?.stock} left
              </span>
            ) : (
              <span className="text-green-600">
                In Stock ({product?.stock})
              </span>
            )}
          </p>
        </div>

        {/* Price */}
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />

        {/* Add to Cart Button */}
        <AddToCartButton
          product={product}
          variant="compact"
          showSubtotal={false}
        />
      </div>
    </div>
  );
};

export default ProductCard;
