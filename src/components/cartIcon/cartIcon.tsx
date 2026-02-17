"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function CartIcon({ serverCartNum , cartId }: { serverCartNum: number , cartId :string }) {
if (cartId) {
  
  localStorage.setItem('cartId',cartId)
}
  const [curtNum, setcurtNum] = useState(serverCartNum);
  console.log(curtNum);
  useEffect(() => {
    function handler(e: CustomEvent) {
      setcurtNum(e.detail);
    }
    window.addEventListener("cartUpdate", handler as EventListener);

  }, []);

  return (
    <>
      <Link href={"/cart"} className="relative cursor-pointer">
        <ShoppingCart />
        <span className="absolute -top-2 start-5/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full">
          {curtNum}
        </span>
      </Link>
    </>
  );
}
