import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Heart, ShoppingCart, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Logout from "../LogOut/Logout";
import CartIcon from "../cartIcon/cartIcon";
import { cartRes } from "@/interfaces/cartInterfaces";
import HeartIcon from "../HeartIcon/HeartIcon";

export default async function Navbar() {
  const session = await getServerSession(authOptions); // da feeh el session elly hia {user , token} law 3amel login w b null law msh 3amel login

  let data : cartRes | null = null
if (session) {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {
      token :session.user.token!
    },
  });
  data  = await response.json();
}

  return (
    <>
      <nav className="bg-gray-100 py-3 sticky top-0 left-0 right-0 z-40 h-16">
        <div className="container mx-auto font-semibold flex flex-col md:flex-row justify-between items-start md:items-center ps-4 md:ps-0 ">
          <h2 className="text-2xl flex">
            <div className="w-12 h-12 bg-black flex justify-center items-center me-3 ">
              <span className="text-white font-bold text-4xl">S</span>
            </div>
            <Link href={"/"} className="font-bold align-middle text-3xl">
              {" "}
              ShopMart{" "}
            </Link>
          </h2>
          <div className="">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="">
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="">
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    {session && data &&( <CartIcon serverCartNum={data?.numOfCartItems} cartId ={data?.data.cartOwner}/>)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    {session && (
                      <Link href="/wishlist">
                        
                        <HeartIcon serverWishlistNum={data?.numOfCartItems ?? 0} />
                      </Link>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link href={"/"}>
                      {" "}
                      <User2Icon className="size-6 text-inherit" />{" "}
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      {session ? (
                        <>
                          <Link href={"/profile"}>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                          <Link href={"/allorders"}>
                            <DropdownMenuItem>MyOrders</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            <Logout />
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <Link href={"/login"}>
                            <DropdownMenuItem>Login</DropdownMenuItem>
                          </Link>
                          <Link href={"/register"}>
                            <DropdownMenuItem>Register</DropdownMenuItem>
                          </Link>
                        </>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
