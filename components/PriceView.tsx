// export default PriceView;
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  if (!price) return null;

  // ✅ Correct discount calculation
  const discountedPrice =
    discount && discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Final price (after discount) */}
      <PriceFormatter
        amount={discountedPrice}
        className={cn("text-shop_dark_green font-semibold", className)}
      />

      {/* Original price (only if discount exists) */}
      {discount && discount > 0 && (
        <div className="flex items-center gap-1">
          <PriceFormatter
            amount={price}
            className={twMerge(
              "line-through text-xs font-normal text-zinc-500",
              className
            )}
          />
          <span className="text-xs font-semibold text-red-500">
            {discount}% off
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceView;
