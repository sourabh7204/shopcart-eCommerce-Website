"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import WishListProducts from "@/components/WishListProducts";
import NoAccess from "@/components/NoAccess";

const WishListPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isSignedIn ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
