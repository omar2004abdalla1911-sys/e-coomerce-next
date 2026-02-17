import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkOutAction } from '@/actions/addToCartAction'
import { shippingAddres } from '@/interfaces/cartInterfaces'
import { Loader2 } from 'lucide-react'

export default function CheckOutSession({cartId} : {cartId : string}) {

  const [isLoading, setIsLoading] = useState(false)

    const city = useRef<null | HTMLInputElement >(null);
    const details = useRef<null | HTMLInputElement >(null);
    const phone = useRef<null | HTMLInputElement >(null);
     async function checkOut (){
      setIsLoading(true)
        const shippingAddress : shippingAddres = {
            city : city?.current?.value as string,
            details : details?.current?.value as string,
            phone : phone?.current?.value as string,

        }
        const response = await checkOutAction(cartId , shippingAddress);
        if (response.status == 'success') {
          location.href = response.session.url
        }
        setIsLoading(false)
    }
  return <>
  
  <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full mt-2 py-4">CheckOut</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add shipping Addrress</DialogTitle>
            <DialogDescription>
                please, Add your shipping Addrress
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input ref={city} id="city" name="city" defaultValue="Cairo" />
            </Field>
            <Field>
              <Label htmlFor="details">Details</Label>
              <Input ref={details} id="details" name="details" defaultValue="maadi" />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phone} id="phone" name="phone" defaultValue="01225356513" />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={checkOut} type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className='animate-spin'/>}
            Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
