// import React from "react";
// import Title from "../Title";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Label } from "../ui/label";

// const priceArray = [
//   { title: "Under $100", value: "0-100" },
//   { title: "$100 - $200", value: "100-200" },
//   { title: "$200 - $300", value: "200-300" },
//   { title: "$300 - $500", value: "300-500" },
//   { title: "Over $500", value: "500-10000" },
// ];

// interface Props {
//   selectedPrice?: string | null;
//   setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
// }
// const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
//   return (
//     <div className="w-full bg-white p-5">
//       <Title className="text-base font-black">Price</Title>
//       <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""}>
//         {priceArray?.map((price, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedPrice(price?.value)}
//             className="flex items-center space-x-2 hover:cursor-pointer"
//           >
//             <RadioGroupItem
//               value={price?.value}
//               id={price?.value}
//               className="rounded-sm"
//             />
//             <Label
//               htmlFor={price.value}
//               className={`${selectedPrice === price?.value ? "font-semibold text-shop_dark_green" : "font-normal"}`}
//             >
//               {price?.title}
//             </Label>
//           </div>
//         ))}
//       </RadioGroup>
//       {selectedPrice && (
//         <button
//           onClick={() => setSelectedPrice(null)}
//           className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect"
//         >
//           Reset selection
//         </button>
//       )}
//     </div>
//   );
// };

// export default PriceList;
"use client";

import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

// INR price ranges
const priceArray = [
  { title: "Under ₹1,000", value: "0-1000" },
  { title: "₹1,000 – ₹5,000", value: "1000-5000" },
  { title: "₹5,000 – ₹10,000", value: "5000-10000" },
  { title: "₹10,000 – ₹25,000", value: "10000-25000" },
  { title: "Above ₹25,000", value: "25000-100000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="border-t border-gray-100">
      <div className="px-5 py-3 border-b border-gray-100">
        <Title className="text-[14px] font-semibold text-gray-800">PRICE</Title>
      </div>

      <RadioGroup
        className="flex flex-col gap-0 py-2"
        value={selectedPrice || ""}
      >
        {priceArray.map((price, index) => {
          const isActive = selectedPrice === price.value;
          return (
            <div
              key={index}
              onClick={() => setSelectedPrice(price.value)}
              className={cn(
                "flex items-center px-5 py-2 cursor-pointer text-sm transition-all",
                isActive
                  ? "bg-[#f1faf1] text-[#007C32] font-medium"
                  : "hover:bg-gray-50 text-gray-700"
              )}
            >
              <RadioGroupItem
                value={price.value}
                id={price.value}
                className={cn(
                  "h-4 w-4 border-[1.5px] border-gray-400 mr-3",
                  isActive && "border-[#007C32] bg-[#007C32]"
                )}
              />
              <Label
                htmlFor={price.value}
                className="text-[13.5px] leading-none select-none cursor-pointer"
              >
                {price.title}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {selectedPrice && (
        <div className="px-5 pb-3 pt-1">
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-[13px] text-blue-600 font-medium underline underline-offset-2 hover:text-blue-800"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceList;
