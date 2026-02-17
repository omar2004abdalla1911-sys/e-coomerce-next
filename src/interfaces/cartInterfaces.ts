// import { Brand, Category } from "./productinterface"

export interface cartRes {
    status: string
    numOfCartItems : number
    message?: string
    cartId: string
    data : Data
}
export interface shippingAddres {
    city: string
   details:string
   phone:string
}
export interface Data {
    _id :string
    cartOwner : string
    products: CartItem[]
    createdAt:string
    updatedAt:string
    _v:number
    totalCartPrice:number
}
export interface CartItem {
    count: number
    _id : string
    product: product
    price: number
}

export interface product {
    subcategory:Subcategory[]
    _id :string
    title:string
    quantity:number
    imageCover:string
    category : Category
    brand:Brand
    ratingsAverage:number
    id:string

}
export interface Subcategory {
    _id :string
    name:string
    slug:string
    category:string

}
export interface Category {
    _id :string
    name:string
    slug:string
    image:string

}
export interface Brand{
    _id :string
    name:string
    slug:string
    image:string

}






