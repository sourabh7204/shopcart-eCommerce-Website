// "use client";

// import React, { useState } from "react";
// import PriceList from "./filters/PriceList"; // ✅ adjust if you moved PriceList
// import Title from "./Title";
// import { ChevronDown, ChevronUp } from "lucide-react";

// interface FilterSidebarProps {
//   categories: { title: string }[];
//   brands: { title: string }[];
// }

// /**
//  * Flipkart / Amazon Style Sidebar Filter
//  * - Collapsible sections
//  * - Smooth hover effects
//  * - Clean structure
//  */
// const FilterSidebar = ({ categories = [], brands = [] }: FilterSidebarProps) => {
//   const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
//   const [openSection, setOpenSection] = useState<"category" | "brand" | "price" | null>("category");

//   const toggleSection = (section: "category" | "brand" | "price") => {
//     setOpenSection((prev) => (prev === section ? null : section));
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
//       {/* Filter Title */}
//       <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
//         <Title className="text-sm font-semibold text-gray-800 tracking-wide">
//           FILTERS
//         </Title>
//       </div>

//       {/* CATEGORY SECTION */}
//       <div className="border-b border-gray-100">
//         <button
//           onClick={() => toggleSection("category")}
//           className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition-colors"
//         >
//           <h3 className="text-[14px] font-semibold text-gray-800">CATEGORY</h3>
//           {openSection === "category" ? (
//             <ChevronUp size={18} className="text-gray-500" />
//           ) : (
//             <ChevronDown size={18} className="text-gray-500" />
//           )}
//         </button>

//         {openSection === "category" && (
//           <div className="px-5 pb-3 space-y-2 animate-in fade-in duration-150">
//             {categories.length > 0 ? (
//               categories.slice(0, 8).map((cat, i) => (
//                 <label
//                   key={i}
//                   className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-shop_dark_green"
//                 >
//                   <input
//                     type="checkbox"
//                     className="accent-shop_dark_green w-4 h-4"
//                   />
//                   {cat.title}
//                 </label>
//               ))
//             ) : (
//               <p className="text-xs text-gray-500 italic">
//                 No categories found
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* BRAND SECTION */}
//       <div className="border-b border-gray-100">
//         <button
//           onClick={() => toggleSection("brand")}
//           className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition-colors"
//         >
//           <h3 className="text-[14px] font-semibold text-gray-800">BRAND</h3>
//           {openSection === "brand" ? (
//             <ChevronUp size={18} className="text-gray-500" />
//           ) : (
//             <ChevronDown size={18} className="text-gray-500" />
//           )}
//         </button>

//         {openSection === "brand" && (
//           <div className="px-5 pb-3 space-y-2 animate-in fade-in duration-150">
//             {brands.length > 0 ? (
//               brands.slice(0, 8).map((brand, i) => (
//                 <label
//                   key={i}
//                   className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-shop_dark_green"
//                 >
//                   <input
//                     type="checkbox"
//                     className="accent-shop_dark_green w-4 h-4"
//                   />
//                   {brand.title}
//                 </label>
//               ))
//             ) : (
//               <p className="text-xs text-gray-500 italic">No brands found</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* PRICE SECTION */}
//       <div>
//         <button
//           onClick={() => toggleSection("price")}
//           className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition-colors"
//         >
//           <h3 className="text-[14px] font-semibold text-gray-800">PRICE</h3>
//           {openSection === "price" ? (
//             <ChevronUp size={18} className="text-gray-500" />
//           ) : (
//             <ChevronDown size={18} className="text-gray-500" />
//           )}
//         </button>

//         {openSection === "price" && (
//           <div className="animate-in fade-in duration-150">
//             <PriceList
//               selectedPrice={selectedPrice}
//               setSelectedPrice={setSelectedPrice}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
