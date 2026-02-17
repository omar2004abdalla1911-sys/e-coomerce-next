import React from 'react'
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
import { brandRes } from '@/interfaces/brandinterface';
import Image from 'next/image';

export default async function Brands() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );
    const data: brandRes = await response.json();
  return <>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((brand) => (
          <div key={brand._id} className="p-2">
            <Card className="overflow-hidden pt-0">
              <NextLink href={"/brands/" + brand._id}>
                <div className=" -m-1 -mt-6">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className=" relative z-20 w-full object-cover"
                  />
                </div>
                <CardHeader className="mt-2 ">
                  <CardDescription className=' text-black text-center text-lg font-semibold'>{brand.name}</CardDescription>

                  
                </CardHeader>
                
              </NextLink>
              
            </Card>
          </div>
        ))}
      </div>
  
  
  </>
}
