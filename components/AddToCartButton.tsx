// "use client";
// import { Product } from "@/sanity.types";
// import { Button } from "./ui/button";
// import { cn } from "@/lib/utils";
// import { ShoppingCart } from "lucide-react";
// import useStore from "@/store";
// import toast from "react-hot-toast";
// import PriceFormatter from "./PriceFormatter";
// import QuantityButtons from "./QuantityButtons";

// interface Props {
//   product: Product;
//   className?: string;
// }

// const AddToCartButton = ({ product, className }: Props) => {
//   const { addItem, getItemCount } = useStore();
//   const itemCount = getItemCount(product?._id);
//   const isOutOfStock = product?.stock === 0;

//   const handleAddToCart = () => {
//     if ((product?.stock as number) > itemCount) {
//       addItem(product);
//       toast.success(
//         `${product?.name?.substring(0, 12)}... added successfully!`
//       );
//     } else {
//       toast.error("Can not add more than available stock");
//     }
//   };
//   return (
//     <div className="w-full h-12 flex items-center">
//       {itemCount ? (
//         <div className="text-sm w-full">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-darkColor/80">Quantity</span>
//             <QuantityButtons product={product} />
//           </div>
//           <div className="flex items-center justify-between border-t pt-1">
//             <span className="text-xs font-semibold">Subtotal</span>
//             <PriceFormatter
//               amount={product?.price ? product?.price * itemCount : 0}
//             />
//           </div>
//         </div>
//       ) : (
//         <Button
//           onClick={handleAddToCart}
//           disabled={isOutOfStock}
//           className={cn(
//             "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
//             className
//           )}
//         >
//           <ShoppingCart /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//         </Button>
//       )}
//     </div>
//   );
// };

// export default AddToCartButton;
"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

interface Props {
  product: Product;
  className?: string;
  variant?: "default" | "compact" | "inline" | "minimal";
  showSubtotal?: boolean;
  showQuickBuy?: boolean;
}

const AddToCartButton = ({
  product,
  className,
  variant = "default",
  showSubtotal = true,
  showQuickBuy = false,
}: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  const isLowStock =
    (product?.stock as number) > 0 && (product?.stock as number) <= 5;

  const [justAdded, setJustAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessRipple, setShowSuccessRipple] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Smooth counter animation
  const count = useMotionValue(itemCount);
  const smoothCount = useSpring(count, { stiffness: 300, damping: 30 });

  useEffect(() => {
    count.set(itemCount);
  }, [itemCount, count]);

  // Haptic feedback simulation
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const handleAddToCart = async () => {
    if ((product?.stock as number) > itemCount) {
      setIsLoading(true);
      triggerHaptic();

      setTimeout(() => {
        addItem(product);
        setIsLoading(false);
        setJustAdded(true);
        setShowSuccessRipple(true);

        toast.success(
          (t) => (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Added to cart!</p>
                <p className="text-xs text-gray-600">
                  {product?.name?.substring(0, 30)}...
                </p>
              </div>
            </div>
          ),
          {
            duration: 3000,
            style: {
              background: "#fff",
              color: "#000",
              padding: "12px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            },
          }
        );

        setTimeout(() => {
          setJustAdded(false);
          setShowSuccessRipple(false);
        }, 2000);
      }, 400);
    } else {
      toast.error(
        (t) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Stock limit reached</p>
              <p className="text-xs text-gray-600">
                Maximum {product?.stock} available
              </p>
            </div>
          </div>
        ),
        {
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
            padding: "12px",
            borderRadius: "12px",
          },
        }
      );
    }
  };

  const handleIncrement = useCallback(() => {
    if ((product?.stock as number) > itemCount) {
      triggerHaptic();
      addItem(product);
      toast.success("Quantity increased", {
        icon: "➕",
        duration: 1500,
        style: { borderRadius: "8px" },
      });
    } else {
      toast.error("Maximum stock reached", {
        icon: "⚠️",
        duration: 2000,
      });
    }
  }, [product, itemCount, addItem, triggerHaptic]);

  const handleDecrement = useCallback(() => {
    triggerHaptic();
    removeItem(product?._id);

    if (itemCount === 1) {
      toast.success(`Removed from cart`, {
        icon: "🗑️",
        duration: 2000,
      });
    } else {
      toast.success("Quantity decreased", {
        icon: "➖",
        duration: 1500,
      });
    }
  }, [product?._id, itemCount, removeItem, triggerHaptic]);

  // Success ripple effect
  const SuccessRipple = () => (
    <motion.div
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-green-500/30 rounded-full pointer-events-none"
    />
  );

  // Compact variant for product cards
  if (variant === "compact") {
    return (
      <div className="w-full space-y-2" ref={buttonRef}>
        <AnimatePresence mode="wait">
          {itemCount > 0 ? (
            <motion.div
              key="quantity-controls"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative"
            >
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-shop_light_green/10 to-shop_dark_green/10 rounded-xl border border-shop_dark_green/20 backdrop-blur-sm">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecrement}
                  disabled={isOutOfStock}
                  className="h-8 w-8 rounded-full bg-white border-2 border-shop_dark_green/30 hover:border-shop_dark_green flex items-center justify-center transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  <Minus className="w-3.5 h-3.5 text-shop_dark_green" />
                </motion.button>

                <div className="flex-1 text-center">
                  <motion.div
                    key={itemCount}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="text-sm font-bold text-shop_dark_green"
                  >
                    {itemCount} in cart
                  </motion.div>
                  {showSubtotal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <PriceFormatter
                        amount={product?.price ? product?.price * itemCount : 0}
                        className="text-xs font-semibold text-gray-600"
                      />
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncrement}
                  disabled={
                    isOutOfStock || (product?.stock as number) <= itemCount
                  }
                  className="h-8 w-8 rounded-full bg-shop_dark_green border-2 border-shop_dark_green hover:bg-shop_dark_green/90 flex items-center justify-center transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute -top-2 -right-2 bg-shop_orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                {itemCount}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="add-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {showSuccessRipple && <SuccessRipple />}

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isLoading}
                className={cn(
                  "w-full relative overflow-hidden group py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
                  justAdded
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : isOutOfStock
                      ? "bg-gray-300 text-gray-600"
                      : "bg-gradient-to-r from-shop_dark_green to-shop_light_green text-white hover:from-shop_light_green hover:to-shop_dark_green",
                  className
                )}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />

                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Package className="w-4 h-4" />
                      </motion.div>
                      <span>Adding...</span>
                    </>
                  ) : justAdded ? (
                    <>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </span>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stock indicator with animations */}
        <AnimatePresence>
          {isLowStock && !isOutOfStock && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs bg-gradient-to-r from-orange-50 to-red-50 px-2 py-1.5 rounded-lg border border-orange-200">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                />
                <span className="font-medium text-orange-700">
                  Only {product?.stock} left!
                </span>
                <TrendingUp className="w-3 h-3 text-orange-500 ml-auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    if (itemCount > 0) {
      return (
        <div className="flex items-center gap-1.5 bg-shop_light_green/10 px-2 py-1 rounded-full border border-shop_light_green/30">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrement}
            className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:bg-shop_dark_green/10"
          >
            <Minus className="w-3 h-3" />
          </motion.button>
          <span className="text-xs font-bold min-w-[20px] text-center">
            {itemCount}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrement}
            disabled={(product?.stock as number) <= itemCount}
            className="w-5 h-5 rounded-full bg-shop_dark_green text-white flex items-center justify-center hover:bg-shop_dark_green/90 disabled:opacity-50"
          >
            <Plus className="w-3 h-3" />
          </motion.button>
        </div>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
          isOutOfStock
            ? "bg-gray-200 text-gray-500"
            : "bg-shop_dark_green text-white hover:bg-shop_dark_green/90 shadow-sm hover:shadow-md",
          className
        )}
      >
        <ShoppingCart className="w-3 h-3 inline mr-1" />
        {isOutOfStock ? "Out" : "Add"}
      </motion.button>
    );
  }

  // Default variant (product detail page)
  return (
    <div className="w-full space-y-4">
      <AnimatePresence mode="wait">
        {itemCount > 0 ? (
          <motion.div
            key="full-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4"
          >
            {/* Quantity Controls */}
            <div className="relative p-5 bg-gradient-to-br from-shop_light_green/5 to-shop_dark_green/5 rounded-2xl border-2 border-shop_dark_green/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-800">
                    Quantity
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {product?.stock} available
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="text-2xl"
                >
                  🛒
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecrement}
                  disabled={isOutOfStock}
                  className="h-12 w-12 rounded-2xl bg-white border-2 border-shop_dark_green/30 hover:border-shop_dark_green hover:bg-shop_dark_green/5 flex items-center justify-center transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <Minus className="w-5 h-5 text-shop_dark_green" />
                </motion.button>

                <div className="min-w-[100px] text-center">
                  <motion.div
                    key={itemCount}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-4xl font-black text-shop_dark_green"
                  >
                    {itemCount}
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    in your cart
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncrement}
                  disabled={
                    isOutOfStock || (product?.stock as number) <= itemCount
                  }
                  className="h-12 w-12 rounded-2xl bg-gradient-to-br from-shop_dark_green to-shop_light_green text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Subtotal with animation */}
            {showSubtotal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative p-5 bg-gradient-to-r from-shop_dark_green/10 to-shop_light_green/10 rounded-2xl border-2 border-shop_dark_green/30 overflow-hidden"
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundSize: "60px 60px",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-600 block">
                      Subtotal
                    </span>
                    <span className="text-xs text-gray-500">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <motion.div
                    key={itemCount}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <PriceFormatter
                      amount={product?.price ? product?.price * itemCount : 0}
                      className="text-3xl font-black text-shop_dark_green"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="add-button-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            {showSuccessRipple && <SuccessRipple />}

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
              className={cn(
                "w-full relative overflow-hidden h-14 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed",
                justAdded
                  ? "bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-[length:200%_100%] animate-gradient text-white"
                  : isOutOfStock
                    ? "bg-gray-300 text-gray-600"
                    : "bg-gradient-to-r from-shop_dark_green via-shop_light_green to-shop_dark_green bg-[length:200%_100%] text-white hover:bg-[position:100%_0]",
                className
              )}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              <div className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{
                        rotate: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: { duration: 0.5, repeat: Infinity },
                      }}
                    >
                      <Package className="w-6 h-6" />
                    </motion.div>
                    <span>Adding to Cart...</span>
                  </>
                ) : justAdded ? (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                    <span>Added to Cart!</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 0] }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl absolute"
                    >
                      ✨
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </motion.div>
                    <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced stock warnings */}
      <AnimatePresence>
        {isLowStock && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 border-2 border-orange-300 rounded-xl">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(249, 115, 22, 0)",
                    "0 0 0 10px rgba(249, 115, 22, 0)",
                    "0 0 0 0 rgba(249, 115, 22, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-orange-500 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-orange-700">
                  🔥 Hurry! Almost gone
                </p>
                <p className="text-xs text-orange-600">
                  Only {product?.stock} items left in stock
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
          </motion.div>
        )}

        {isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-700">Out of Stock</p>
              <p className="text-xs text-red-600">
                This item is currently unavailable
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCartButton;
