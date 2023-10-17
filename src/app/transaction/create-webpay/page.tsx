'use client'
import { getCart } from "@/services/cart"
import { TCart } from "@/types/Interfaces"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function Webpay() {
  const [token, settoken] = useState<string | null>(null)
  const [message, setmessage] = useState<string | null>(null)

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

  const createOrder = async () => {
    const response = await fetch('http://localhost:3000/api/transbank/create-order', { 
      method: 'POST' ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    const date = await response.json()
    if (date.error) return setmessage(date.error)
    settoken(date.orderResponse.token)
    console.log('order webpay')
  }

  return (
    <section>
      <section className="flex gap-4">
        <button 
          disabled={data.length < 1 ? true : false}
          onClick={createOrder}
          className={`p-3 bg-blue-500 rounded-md text-white font-sans font-bold ${data.length < 1 ? 'opacity-50' : 'opacity-100'}`}>Crear orden
        </button>
      </section>
      
      {message && <p className="text-red-500 font-sans font-bold text-center mt-2">{message}</p>}
      <form className="p-4 border m-2" method="post" action="https://webpay3gint.transbank.cl/webpayserver/initTransaction">
        <input type="hidden" name="token_ws" value={token!} />
        <button disabled={!token ? true : false} className={`p-3 bg-pink-600 rounded-md text-white font-sans font-bold ${!token ? 'opacity-50' : 'opacity-100'}`} type="submit">ir a pagar</button>
      </form>
    </section>
  )
}
