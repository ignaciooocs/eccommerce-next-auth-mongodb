'use client'
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { TCart } from "@/types/Interfaces"
import CreateOrder from "../products/CreateOrder"
import Link from "next/link"
import ChangeQuantity from "./ChangeQuantity"
import { getCart } from "@/services/cart"

export default function Cart () {
  const { data, isLoading, error} = useQuery<TCart | null>({
    queryFn: getCart,
    queryKey: ['User'],
    onSuccess: () => {
      console.log('Success')
    }
  })

  if (isLoading) return <section>Loading...</section>
  if (error) return <section>Error</section>
  if (!data) return <section>No estas iniciado</section>

  return (
    <>
      {data.length > 0 && <CreateOrder cart={data!}/>}
      <ul>
        {data.length < 1 && (
          <section className='flex justify-center p-2'>
            <p>Aun no tienes productos en el carro</p>
            <Link href='/products' >Ver Productos</Link>
          </section>
        )}
        {data?.map(({id_product, quantity}) => (
          <li key={id_product._id} className='flex gap-x-2 items-center'>
            <figure className="h-24 w-24">
              <Image src={id_product.image[0]} alt={id_product.name} height={300} width={300} className='w-full h-full' />
            </figure>
            <p>{id_product.name}</p>
            <ChangeQuantity quantity={quantity} id={id_product._id}/>
          </li>
        ))}
      </ul>
    </>
    
  )
}