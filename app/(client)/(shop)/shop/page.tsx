import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
// import React from "react";
// import Shop from "@/components/Shop";
// import { getAllBrands, getCategories } from "@/sanity/queries";
// import FilterSidebar from "@/components/FilterSidebar"; // ✅ use wrapper

// const ShopPage = async () => {
//   const categories = await getCategories();
//   const brands = await getAllBrands();

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 py-6 px-4 sm:px-6 lg:px-8">
//         {/* Sidebar */}
//         <aside className="hidden lg:block w-[280px] shrink-0">
//           <div className="sticky top-24 space-y-5">
//             <FilterSidebar categories={categories} brands={brands} />
//           </div>
//         </aside>

//         {/* Main Product Grid */}
//         <main className="flex-1">
//           <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-4 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <h1 className="text-base font-semibold text-gray-800">
//               Showing Products
//             </h1>
//             <select
//               className="mt-2 sm:mt-0 border border-gray-300 text-sm rounded-md px-3 py-1.5 focus:ring-1 focus:ring-shop_dark_green focus:border-shop_dark_green outline-none"
//               defaultValue="featured"
//             >
//               <option value="featured">Sort by: Featured</option>
//               <option value="low-high">Price: Low to High</option>
//               <option value="high-low">Price: High to Low</option>
//               <option value="newest">Newest First</option>
//             </select>
//           </div>

//           <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4">
//             <Shop categories={categories} brands={brands} />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;
