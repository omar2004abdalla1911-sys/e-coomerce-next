'use client'
import { useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import { cartRes } from '@/interfaces/cartInterfaces';
import toast from 'react-hot-toast'

import { usePathname, useRouter } from 'next/navigation'

import { addToCartAction } from '@/actions/addToCartAction'
import AddToWishlist from '../AddToWishList/AddToWishList'
import { Session } from 'next-auth'


export default function AddToCart({productId } : {productId? : string }   ) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pathName = usePathname()

    async function addToCart(productId? : string) {

      if(!productId) return
      setIsLoading(true)  
      try{
          
           const data : cartRes = await addToCartAction(productId) 
        if(data == null){
            router.push('/login')
        }else{
          toast.success(data.message + '')
          dispatchEvent(new CustomEvent('cartUpdate' , {detail : data.numOfCartItems}))
        }
    }catch(err){ 
        toast.error('' + err)
    } 
    setIsLoading(false)  
        
    }


  return  <>
        <CardFooter className='gap-3'>
              <Button onClick={()=> addToCart(productId)} disabled={isLoading} className='grow gap-2'>   
                {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>}      Add To Cart </Button>
              {pathName !== '/wishlist' &&  productId && (
  <AddToWishlist productId={productId} />
)} 
            </CardFooter>
  
  </>
}