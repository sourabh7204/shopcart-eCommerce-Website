// import React from "react";
// import Container from "./Container";
// import Logo from "./Logo";
// import HeaderMenu from "./HeaderMenu";
// import SearchBar from "./SearchBar";
// import CartIcon from "./CartIcon";
// import FavoriteButton from "./FavoriteButton";
// import SignIn from "./SignIn";
// import MobileMenu from "./MobileMenu";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { Logs } from "lucide-react";
// import { getMyOrders } from "@/sanity/queries";

// const Header = async () => {
//   const { userId } = await auth();
//   let orders = null;
//   if (userId) {
//     orders = await getMyOrders(userId);
//   }

//   return (
//     <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
//       <Container className="flex items-center justify-between text-lightColor">
//         <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
//           <MobileMenu />
//           <Logo />
//         </div>
//         <HeaderMenu />
//         <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
//           <SearchBar />
//           <CartIcon />
//           <FavoriteButton />

//           {userId && (
//             <Link
//               href={"/orders"}
//               className="group relative hover:text-shop_light_green hoverEffect"
//             >
//               <Logs />
//               <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
//                 {orders?.length ? orders?.length : 0}
//               </span>
//             </Link>
//           )}

//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//           <SignedOut>
//             <SignIn />
//           </SignedOut>
//         </div>
//       </Container>
//     </header>
//   );
// };

// export default Header;
"use client";

import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SignIn from "./SignIn";
import Link from "next/link";
import { Logs } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        {/* Left side: Logo + MobileMenu */}
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <Logo />
        </div>

        {/* Center Menu */}
        <HeaderMenu />

        {/* Right side: Buttons */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          <SignedIn>
            {/* Orders Link and User Logo visible when logged in */}
            <Link
              href="/orders"
              className="group relative hover:text-shop_light_green hoverEffect"
            >
              <Logs />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignIn />
          </SignedOut>
        </div>
      </Container>
    </header>
  );
};

export default Header;
