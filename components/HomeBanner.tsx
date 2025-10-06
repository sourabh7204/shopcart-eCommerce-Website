// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// const HomeBanner = () => (
//   <div className="relative w-full h-[250px] bg-gradient-to-r from-green-100 via-pink-100 to-yellow-100 rounded-2xl overflow-hidden px-6 md:px-16 shadow-lg flex items-center justify-between">
//     {/* Left Content */}
//     <div className="space-y-3 z-10 max-w-md">
//       <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
//         Big Brand Sale 🎉
//       </h1>
//       <p className="text-gray-700 text-sm md:text-lg font-medium">
//         Flat <span className="text-red-500 font-bold">50% OFF</span> on
//         Headphones
//       </p>
//       <p className="text-gray-600 text-xs md:text-base">
//         Shop product hits from **Sony, JBL, Bose**. Limited time deals!
//       </p>
//       <Link
//         href="/shop"
//         className="inline-block bg-shop_dark_green text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-md hover:bg-green-800 transition"
//       >
//         Shop Now
//       </Link>
//     </div>

//     {/* Right Side — Product Images with Labels */}
//     <div className="flex gap-8 items-end absolute bottom-4 right-6">
//       {/* JBL Product */}
//       <div className="flex flex-col items-center text-center">
//         <Image
//           src="/brands/jbl.png"
//           alt="JBL T450BT"
//           width={150}
//           height={150}
//           className="drop-shadow-lg"
//         />
//         <p className="text-sm md:text-base font-bold text-gray-800 mt-1">
//           JBL T450BT
//         </p>
//         <span className="text-xs md:text-sm text-green-600 font-semibold">
//           Best Seller
//         </span>
//       </div>

//       {/* Bose Product */}
//       <div className="flex flex-col items-center text-center">
//         <Image
//           src="/brands/bose.png"
//           alt="Bose QuietComfort 35 II"
//           width={150}
//           height={150}
//           className="drop-shadow-lg"
//         />
//         <p className="text-sm md:text-base font-bold text-gray-800 mt-1">
//           Bose QC 35 II
//         </p>
//         <span className="text-xs md:text-sm text-blue-600 font-semibold">
//           Limited Offer
//         </span>
//       </div>

//       {/* Sony Placeholder */}
//       <div className="flex flex-col items-center text-center">
//         <Image
//           src="/brands/sony.png"
//           alt="Sony Headphones"
//           width={120}
//           height={120}
//           className="drop-shadow-lg"
//         />
//         <p className="text-sm md:text-base font-bold text-gray-800 mt-0">
//           Sony WH-1000XM4
//         </p>
//         <span className="text-xs md:text-sm text-red-500 font-semibold">
//           New Price
//         </span>
//       </div>
//     </div>
//   </div>
// );

// export default HomeBanner;
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingBag, Zap, ArrowRight, Sparkles } from "lucide-react";

export const HomeBanner = () => {
  const products = [
    {
      name: "JBL T450BT",
      image: "/brands/jbl.png",
      badge: "Best Seller",
      color: "green",
    },
    {
      name: "Bose QC 35 II",
      image: "/brands/bose.png",
      badge: "Limited",
      color: "blue",
    },
    {
      name: "Sony WH-1000XM4",
      image: "/brands/sony.png",
      badge: "Hot Deal",
      color: "red",
    },
  ];

  return (
    <div className="relative w-full min-h-[320px] lg:h-[380px] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl overflow-hidden shadow-2xl">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-shop_light_green/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-10 gap-8">
        {/* Left text section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 z-10 max-w-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-shop_orange" />
            <span className="text-sm font-bold text-shop_dark_green">
              SPECIAL OFFER
            </span>
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900">
              Big Brand Sale 🎉
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-2xl">
                <Zap className="w-5 h-5" fill="white" />
                <span className="text-2xl md:text-3xl font-black">50% OFF</span>
              </div>
            </motion.div>
          </div>

          <p className="text-base md:text-lg text-gray-700">
            Premium headphones from{" "}
            <span className="font-bold text-shop_dark_green">
              Sony, JBL, Bose
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-shop_dark_green to-shop_light_green text-white px-7 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right product section */}
        <div className="hidden lg:flex gap-6 items-end">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={110}
                  height={110}
                  className="drop-shadow-2xl object-contain"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-black/20 rounded-full blur-md"
                />
              </div>
              <p className="font-bold text-sm mt-2">{product.name}</p>
              <span
                className={`text-xs font-semibold text-${product.color}-600`}
              >
                {product.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
