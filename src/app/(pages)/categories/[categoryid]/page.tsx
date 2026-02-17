import { Params } from "next/dist/server/request/params";
import React from "react";
import NextLink from "next/link";
import { ProductsResponse } from "@/interfaces/productinterface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import AddToCart from "@/components/AddToCatr/AddToCart";
import { singlecatRes } from "@/interfaces/categoryinterface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


export default async function CategoryDetails({ params }: { params: Params }) {
  const { categoryid } = await params;

    const [response, catRes] = await Promise.all([
    fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryid}`,
  ),
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/` + categoryid),
  ]);


  const data: ProductsResponse = await response.json();
  const catdata: singlecatRes = await catRes.json();
  const session = getServerSession(authOptions);



  return (
    <>
      {data.results === 0 ? (
        <div className="mt-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {catdata.data.name}
          </h2>
          <p className="text-muted-foreground">Products in this category</p>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((product) => (
            <div key={product._id} className="p-2">
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
                    <p className="text-lg font-semibold">
                      {" "}
                      EGP {product.price}
                    </p>
                  </CardContent>
                </NextLink>
                <AddToCart productId={product._id}  />
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
