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

import Image from 'next/image';
import { categoryRes } from '@/interfaces/categoryinterface';

export default async function Categoriess() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    const data: categoryRes = await response.json();
  return <>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((category) => (
          <div key={category._id} className="p-2">
            <Card className="overflow-hidden pt-0">
              <NextLink href={"/categories/" + category._id}>
                <div className=" -m-1 -mt-6">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={100}
                    className=" relative z-20 w-full object-cover"
                  />
                </div>
                <CardHeader className="mt-2 ">
                  <CardDescription className=' text-black text-center text-lg font-semibold'>{category.name}</CardDescription>

                  
                </CardHeader>
                
              </NextLink>
              
            </Card>
          </div>
        ))}
      </div>
  
  
  </>
}