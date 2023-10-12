import { NextResponse } from 'next/server'
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, WebpayPlus } from 'transbank-sdk'
import { v4 } from 'uuid'
import { generarNumeroOrden } from '@/utils/generateNumeroOrder'
import { CartItem } from '@/types/Interfaces'
import WebpayOrder from '@/models/WebpayOrder'
import { getServerSession } from 'next-auth/next'
import User from '@/models/user'

export async function POST (req: Request) {
  // WebpayPlus.configureForIntegration('597055555532', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C')
  const body = await req.json()

  // se suman todos los productos que tiene el carrito de compra
  const amount = body.reduce((acc: number, product: CartItem) => acc + (product.id_product.price * product.quantity), 0)

  const sessionId = v4()
  const buyOrder = generarNumeroOrden()
  const returnUrl = 'http://localhost:3000/transaction/view'

  try {
    // Se busca el usuario qye esta activo en ese momento
    const session = await getServerSession()
    const user = await User.findOne({ email: session?.user?.email })

    // Se crea la orden de la compra en WEBPAY
    const createTransaction = await (
      new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY, 
          Environment.Integration
        )
      )).create(
      buyOrder, 
      sessionId, 
      amount, 
      returnUrl
    );

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

    return NextResponse.json({ createTransaction })
  } catch (error) {
    return NextResponse.json({ error: "La orden falló", message: error })
  }
} 