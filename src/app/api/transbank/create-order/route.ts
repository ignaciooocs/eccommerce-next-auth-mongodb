import { NextResponse } from 'next/server'
import { CartItem } from '@/types/Interfaces'
import WebpayOrder from '@/models/WebpayOrder'
import { getServerSession } from 'next-auth/next'
import User from '@/models/user'
import { createTransaction } from '@/utils/transbankMethods'
import connectionDB from '@/libs/database'

export async function POST (req: Request) {
  // WebpayPlus.configureForIntegration('597055555532', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C')
  try {
    // Se busca el usuario qye esta activo en ese momento
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Debes iniciar sesion para realizar una compra' })
    
    const body = await req.json()

    // se suman todos los productos que tiene el carrito de compra
    const amount = body.reduce((acc: number, product: CartItem) => acc + (product.id_product.price * product.quantity), 0)

    await connectionDB()

    const user = await User.findOne({ email: session?.user?.email })

    // Se crea la orden de la compra en WEBPAY
    const { orderResponse, sessionId } = await createTransaction(amount)
    // Se crea la orden con sessionId, id de usuario y el monto
    const webpayOrderSaved = await WebpayOrder.create({ sessionId, amount, userId: user?._id })

    // Se guarda el carrito de la compra en la orden
    body.forEach(async (p: CartItem) => {
      const { _id } = p.id_product
      const product = { id_product: _id, quantity: p.quantity } as CartItem
      webpayOrderSaved.cart.push(product)
    });

    // Se guarda la orden con los cambios realizados
    await webpayOrderSaved.save()

    user?.webpayOrders.push(webpayOrderSaved._id)
    await user?.save()

    return NextResponse.json({ orderResponse })
  } catch (error) {
    return NextResponse.json({ error: "La orden falló", message: error })
  }
} 