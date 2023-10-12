'use client'
import { TCart } from "@/types/Interfaces"

export default function CreateOrder ({ cart }: { cart: TCart }) {

  const createOrder = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/payment/create-order`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      })
      const data = await res.json()
      console.log(data)
      console.log('orden creada')
      window.location.href = data.init_point

    } catch (error) {
      console.log('No se creo la orden')
      throw new Error('No se creo la orden')
    }
  }

  return (
    <section>
      <button className="p-3 text-white bg-green-500 rounded-md font-sans font-bold" onClick={createOrder}>crear orden</button>
    </section>
  )
}