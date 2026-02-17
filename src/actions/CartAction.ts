"use server"

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function updateProductAction(productId : string , count : number) {
    const session = await getServerSession(authOptions);

if (session) {
    
    
    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/"+ productId,
        {
          method: "PUT",
          body:JSON.stringify({count}),
         

          headers:{
              token :session.user.token + '',
              "Content-Type": "application/json",
            },
        }
    )
    const data = await response.json();
    return data ;
}else{
    return null
}
}
export async function deleteProductAction(productId : string) {
    const session = await getServerSession(authOptions);

if (session) {
    
    
    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/"+ productId,
        {
          method: "DELETE",
         

          headers:{
              token :session.user.token + '',
              
            },
        }
    )
    const data = await response.json();
    return data ;
}else{
    return null
}
        
}
export async function clearCartAction() {
    const session = await getServerSession(authOptions);

if (session) {
    
    
    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "DELETE",
         

          headers:{
              token :session.user.token + '',
              
            },
        }
    )
    const data = await response.json();
    return data ;
}else{
    return null
}
        
}