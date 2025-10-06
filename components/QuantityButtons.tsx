// import { Product } from "@/sanity.types";
// import useStore from "@/store";
// import React from "react";
// import { Button } from "./ui/button";
// import { Minus, Plus } from "lucide-react";
// import { cn } from "@/lib/utils";
// import toast from "react-hot-toast";

// interface Props {
//   product: Product;
//   className?: string;
// }
// const QuantityButtons = ({ product, className }: Props) => {
//   const { addItem, removeItem, getItemCount } = useStore();
//   const itemCount = getItemCount(product?._id);
//   const isOutOfStock = product?.stock === 0;

//   const handleRemoveProduct = () => {
//     removeItem(product?._id);
//     if (itemCount > 1) {
//       toast.success("Quantity Decreased successfully!");
//     } else {
//       toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
//     }
//   };

//   const handleAddToCart = () => {
//     if ((product?.stock as number) > itemCount) {
//       addItem(product);
//       toast.success("Quantity Increased successfully!");
//     } else {
//       toast.error("Can not add more than available stock");
//     }
//   };

//   return (
//     <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
//       <Button
//         onClick={handleRemoveProduct}
//         variant="outline"
//         size="icon"
//         disabled={itemCount === 0 || isOutOfStock}
//         className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
//       >
//         <Minus />
//       </Button>
//       <span className="font-semibold text-sm w-6 text-center text-darkColor">
//         {itemCount}
//       </span>
//       <Button
//         onClick={handleAddToCart}
//         variant="outline"
//         size="icon"
//         disabled={isOutOfStock}
//         className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
//       >
//         <Plus />
//       </Button>
//     </div>
//   );
// };

// export default QuantityButtons;
"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { motion } from "motion/react";

interface Props {
  product: Product;
  className?: string;
  variant?: "default" | "compact" | "minimal";
}

const QuantityButtons = ({
  product,
  className,
  variant = "default",
}: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity decreased", {
        icon: "➖",
        duration: 1500,
        style: { borderRadius: "10px" },
      });
    } else {
      toast.success(`${product?.name?.substring(0, 20)} removed`, {
        icon: "🗑️",
        duration: 2000,
        style: { borderRadius: "10px" },
      });
    }
  };

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Quantity increased", {
        icon: "➕",
        duration: 1500,
        style: { borderRadius: "10px" },
      });
    } else {
      toast.error("Cannot add more than available stock", {
        icon: "⚠️",
        duration: 2000,
      });
    }
  };

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleRemoveProduct}
          disabled={itemCount === 0 || isOutOfStock}
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
        >
          <Minus className="w-3 h-3" />
        </motion.button>

        <motion.span
          key={itemCount}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-bold text-sm min-w-[24px] text-center"
        >
          {itemCount}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-6 h-6 rounded-full bg-shop_dark_green hover:bg-shop_dark_green/90 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
        >
          <Plus className="w-3 h-3" />
        </motion.button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemoveProduct}
          disabled={itemCount === 0 || isOutOfStock}
          className="w-7 h-7 rounded-lg bg-white border-2 border-shop_dark_green/30 hover:border-shop_dark_green hover:bg-shop_dark_green/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
        >
          <Minus className="w-3.5 h-3.5 text-shop_dark_green" />
        </motion.button>

        <motion.div
          key={itemCount}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="min-w-[30px] text-center"
        >
          <span className="font-bold text-base text-shop_dark_green">
            {itemCount}
          </span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock || (product?.stock as number) <= itemCount}
          className="w-7 h-7 rounded-lg bg-shop_dark_green hover:bg-shop_dark_green/90 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-8 h-8 border-[1.5px] hover:bg-shop_dark_green/10 hover:border-shop_dark_green hoverEffect rounded-lg"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <motion.span
        key={itemCount}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="font-bold text-lg min-w-[32px] text-center text-shop_dark_green"
      >
        {itemCount}
      </motion.span>

      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock || (product?.stock as number) <= itemCount}
        className="w-8 h-8 border-[1.5px] hover:bg-shop_dark_green/10 hover:border-shop_dark_green hoverEffect rounded-lg"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantityButtons;
