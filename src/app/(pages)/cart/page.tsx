import { authOptions } from '@/auth';
import Cart from '@/components/Cart/Cart';
import { cartRes } from '@/interfaces/cartInterfaces';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Cartpage() {
  const session = await getServerSession(authOptions);
if (session) {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {
      token :session.user.token!
    },
  });
  const data: cartRes = await response.json();
  return <Cart cartData={data} />;
}else{
  return null
}

  


  // نبعت كل البيانات للكومبوننت، وCart نفسها تتعامل مع empty cart
  
}