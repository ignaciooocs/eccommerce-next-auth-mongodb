import { TCart, CartItem } from '@/types/Interfaces'
import Product from '../models/product'

export const modifyStock = async ({ cart }: { cart: TCart }) => {
  cart.forEach(async (p: CartItem) => {
    const { id_product: { _id }, quantity } = p
    const product = await Product.findById(_id)
    if (product && product.stock) {
      product.stock = product.stock - quantity
      await product.save()
      console.log(`Se descontaron ${quantity} del producto ${product.name}`)
    }
  });
}