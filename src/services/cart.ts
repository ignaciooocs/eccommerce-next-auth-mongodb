import { TCart } from "@/types/Interfaces"

export const getCart = async (): Promise<TCart | null> => {
  const res = await fetch('http://localhost:3000/api/user')
  const data = await res.json()

  if (data.error) return null

  return data.cart
}