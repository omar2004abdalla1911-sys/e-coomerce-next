import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/interfaces/productinterface";

import { Heart, ShoppingCartIcon, Star } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Slider from "@/components/Slider/Slider";
import AddToCart from "@/components/AddToCatr/AddToCart";
import AddToWishlist from "@/components/AddToWishList/AddToWishList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
export default async function ProductDetails({ params }: { params: Params }) {
  const { productsid } = await params;
  const response = await fetch(
    `${process.env.API_URL}/products/` + productsid,
  );
  const { data: product }: { data: Product } = await response.json();
  const session = getServerSession(authOptions);
  return (
    <>
      <Card className=" grid grid-cols-1 md:grid-cols-3  items-center  ">
        <div className=" ">
          <Slider images={product.images} title={product.title} />
        </div>
        <div className="col-span-2 space-y-5 p-4">
          <CardHeader className="mt-2">
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className="">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <CardAction className="text-sm">{product.category.name}</CardAction>
            <div className="flex items-center gap-1">
              <Star className="text-amber-400 fill-amber-400" fill="true" />
              <Star className="text-amber-400 fill-amber-400" fill="true" />
              <Star className="text-amber-400 fill-amber-400" fill="true" />
              <Star className="text-amber-400 fill-amber-400" fill="true" />
              <Star className="text-amber-400 fill-amber-400" fill="true" />
              <p className="text-sm text-muted-foreground">
                ({product.ratingsAverage})
              </p>
            </div>
            <p className="text-lg font-semibold"> EGP {product.price}</p>
          </CardContent>
          <div className="flex items-center gap-3">
          <AddToCart productId={product.id}  />
         
          </div>
        </div>
      </Card>
    </>
  );
}
