"use client";
import React, { useState } from "react";
import { addToCartAction } from "@/actions/addToCartAction" 
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader2, ShoppingCartIcon } from "lucide-react";
import { cartRes } from "@/interfaces/cartInterfaces";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function AddToCart({ productId }: { productId: string }) {
  const [Loading, setLoading] = useState(false);

  const router = useRouter();
  async function addTOCart(productId: string) {
    try {
      setLoading(true)

      const res :cartRes = await addToCartAction(productId);

      if (res == null) {
        router.push('/login')
      }
      else{ 
         toast.success(res.message + '');
       
         dispatchEvent(new CustomEvent('cartUpdate',{detail : res.numOfCartItems}))
      }

    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }
  return <>
      <CardFooter className="gap-2 ">
        <Button disabled={Loading} onClick={() => addTOCart(productId)} className="grow gap-2">
          {Loading ? <Loader2 className="animate-spinner"/> : <ShoppingCartIcon className="size-5 text-inherit" />} Add To Cart
        </Button>
       <Heart/>
      </CardFooter>
    </>
  
}
