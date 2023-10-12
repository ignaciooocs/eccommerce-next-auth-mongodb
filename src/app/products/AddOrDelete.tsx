'use client'
import { TCart } from "@/types/Interfaces"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export default function AddOrDelete ({ id, cart }: { id: string, cart: TCart }) {
  const queryClient = useQueryClient()
  const [value, setvalue] = useState<number>(1)

  const addToCart = async () => {
    try {
      await fetch(`http://localhost:3000/api/products/add-to-cart/${id}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: value })
      })
      queryClient.invalidateQueries({ queryKey: ['User']})
    } catch (error) {
      console.log('Producto no agregado')
      throw new Error('Producto no agregado')
    }
  }

  const deleteToCart = async () => {
    try {
      await fetch(`http://localhost:3000/api/products/add-to-cart/${id}`, {
        method: 'DELETE'
      })
      queryClient.invalidateQueries({ queryKey: ['User']})
      console.log('Eliminado')
    } catch (error) {
      console.log('Producto no eliminado')
      throw new Error('Producto no eliminado')
    }
  }

  if (!cart) return <button>Inicia Sesion para comprar</button>

  return (
    <section>
      {cart.some((product) => product.id_product._id === id) 
        ? <button className="p-3 text-white bg-red-500 rounded-md font-sans font-bold" onClick={deleteToCart}>delete</button>
        : (
          <>
            <button className="p-3 text-white bg-green-500 rounded-md font-sans font-bold" onClick={addToCart}>add</button>
            <input type="number" value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(value)
              setvalue(Number(e.target.value))} 
            }/>
          </>
        )
      }
      
    </section>
  )
}