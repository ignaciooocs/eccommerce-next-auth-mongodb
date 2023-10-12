'use client'
import { useQueryClient } from "@tanstack/react-query"

export default function ChangeQuantity ({ quantity, id }: { quantity: number, id: string }) {
  const queryClient = useQueryClient()

  const changeQuantity = async (id: string, method: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/products/add-to-cart/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method })
      })
      queryClient.invalidateQueries({ queryKey: ['User']})
    } catch (error) {
      console.log('No se decremento')
    }
  }

  return (
    <section>
      <button onClick={() => changeQuantity(id, false)}>-</button>
      <p>{quantity}</p>
      <button onClick={() => changeQuantity(id, true)}>+</button>
    </section>
  )
}