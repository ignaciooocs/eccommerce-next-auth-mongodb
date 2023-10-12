'use client'

import { Product, TCart } from "@/types/Interfaces"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getCart } from "@/services/cart"
import AddOrDelete from "./AddOrDelete"

export default function ListProducts ({ products }: { products: Product[]}) {
  const { data } = useQuery<TCart | null>({
    queryFn: getCart,
    queryKey: ['User'],
    onSuccess: () => {
      console.log('Success')
    }
  })


  return (
    <ul className="flex gap-4 p-4 flex-wrap w-4/5 justify-center">
    {products.map((product: Product) => (
      <li key={product._id} className="">
        {product.image.map((image: any) => (
          <figure key={image} className="h-64 w-64">
            <Image src={image} alt={product.name} height={500} width={500} className='w-full h-full' />
          </figure>
        ))}
        <section>
          <p>{product.name}</p>
          <p>Stock: {product.stock}</p>
          <p>Precio: {product.price}</p>
        </section>
        <AddOrDelete cart={data!} id={product._id}/>
      </li>
    ))}
  </ul>
  )
}