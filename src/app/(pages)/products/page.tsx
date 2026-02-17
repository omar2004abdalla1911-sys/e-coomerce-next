import { ProductsResponse } from "@/interfaces/productinterface";
import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, Link, ShoppingCartIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDetails from "./[productsid]/page";
import AddToCart from "@/components/AddToCatr/AddToCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import AddToWishList from "@/components/AddToWishList/AddToWishList";


export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  const data: ProductsResponse = await response.json();

  const session = getServerSession(authOptions);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((product) => (
          <div key={product.id} className="p-2">
            <Card className="overflow-hidden pt-0">
              <NextLink href={"/products/" + product.id}>
                <div className=" -m-1 -mt-6">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={200}
                    height={100}
                    className=" relative z-20 w-full object-cover"
                  />
                </div>
                <CardHeader className="mt-2">
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle className="line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-amber-400 fill-amber-400"
                      fill="true"
                    />
                    <Star
                      className="text-amber-400 fill-amber-400"
                      fill="true"
                    />
                    <Star
                      className="text-amber-400 fill-amber-400"
                      fill="true"
                    />
                    <Star
                      className="text-amber-400 fill-amber-400"
                      fill="true"
                    />
                    <Star
                      className="text-amber-400 fill-amber-400"
                      fill="true"
                    />
                    <p className="text-sm text-muted-foreground">
                      ({product.ratingsAverage})
                    </p>
                  </div>
                  <p className="text-lg font-semibold"> EGP {product.price}</p>
                </CardContent>
              </NextLink>
              

              <AddToCart productId={product.id}   />
            
              
            </Card>
              
          </div>
        ))}
      </div>
    </>
  );
}
