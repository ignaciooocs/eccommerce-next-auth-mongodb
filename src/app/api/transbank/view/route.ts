import AprovedEmail from '@/components/emails/AprovedEmail';
import FailedEmail from '@/components/emails/FailedEmail';
import connectionDB from '@/libs/database';
import WebpayOrder from '@/models/WebpayOrder';
import WebpayTransaction from '@/models/WebpayTransaction';
import Product from '@/models/product';
import User from '@/models/user';
import { CartItem } from '@/types/Interfaces';
import { getStatus, commitTransaction } from '@/utils/transbankMethods';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server'
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST (req: Request) {
  try {
    const { token, tbkToken, tbkIdSesion, tbkOrdenCompra } = await req.json();
    const response = { tbkIdSesion, tbkOrdenCompra }
    if (!token && !tbkToken && !tbkIdSesion && !tbkOrdenCompra) return NextResponse.json(null)
    
    await connectionDB()
    // Se busca el usuario que tiene la session activa (Usuario que esta realizando la compra)
    const session = await getServerSession()
    const user = await User.findOne({ email: session?.user?.email })

    // Si la transaccion se completa correctamente (se confirma)
    if (token && !tbkToken) { 
      const statusResponse = await getStatus(token)

      // Se busca la orden para conseguir los productos del carrito y actualizar sus propiedades
      const webpayOrder = await WebpayOrder.findOne({ sessionId: statusResponse.session_id }).populate('cart.id_product')
      
      // Se comprueba si la orden ya fue completada, 
      // Esto se hace principalmente por si el usuario recarga la pagina de retorno y no vuelva a pasar por el proceso ("AUTHPRIZED" o 'FAILED')
      if (webpayOrder?.completed) return NextResponse.json({ ...statusResponse, products: webpayOrder.cart })

      // confirmacion de la transaccion
      const commitResponse = await commitTransaction(token)
      
      //
      ////////// Si el pago se a realizado corrrectamente
      //
      if (commitResponse.status === 'AUTHORIZED' && commitResponse.response_code === 0) {
        webpayOrder?.cart.forEach(async (p: CartItem) => {
          const { id_product: { _id }, quantity } = p
          const product = await Product.findById(_id)
          if (product && product.stock) {
            product.stock = product.stock - quantity
            await product.save()
            console.log(`Se descontaron ${quantity} del producto ${product.name}`)
          }
        });

        // Se vacia el carrito de compras
        if (user && user.cart) {
          user.cart = [] 
          await user.save()
        }  

        // Se crea una transaccion con los datos recibidos de webpay
        const webpaytransaction = await WebpayTransaction.create({ ...commitResponse, orderId: webpayOrder!._id })

        // La orden se pasa a completada y se le agrega el id de la transaccion y se guarda
        webpayOrder!.completed = true
        webpayOrder!.transactionId = webpaytransaction._id
        webpayOrder!.status = commitResponse.status
        await webpayOrder!.save()

        // Se envia un correo al usuario con los detalles de la compra
        await resend.emails.send({
          from: 'PineBerry <equipopineberry@finanzastransparentes.co>',
          to: [session?.user?.email] as string[],
          subject: 'Compra Éxitosa!',
          react: AprovedEmail({data: { ...commitResponse, products: webpayOrder!.cart }}) as React.ReactElement,
        });

        return NextResponse.json({ ...commitResponse, products: webpayOrder!.cart })
      }

      //
      ///////// Si el pago no se a realizado
      //
      if (commitResponse.status === "FAILED" && commitResponse.response_code === -1) {
        // Se crea una transaccion con los datos recibidos de webpay
        const webpaytransaction = await WebpayTransaction.create({ ...commitResponse, orderId: webpayOrder!._id })

        // La orden se pasa a completada, se le agrega el id de la transaccion y el status, y luego se guarda.
        webpayOrder!.completed = true
        webpayOrder!.transactionId = webpaytransaction._id
        webpayOrder!.status = commitResponse.status
        await webpayOrder!.save()

        // Se envia un correo al usuario que realizo la transaccion indicandoole que NO se realizo el pago
        await resend.emails.send({
          from: 'PineBerry <equipopineberry@finanzastransparentes.co>',
          to: [session?.user?.email] as string[],
          subject: 'Compra Fallida ❌',
          react: FailedEmail({ buy_order: commitResponse.buy_order }) as React.ReactElement,
        });

        return NextResponse.json({ ...commitResponse, products: webpayOrder!.cart })
      }
    }
    // Se busca la orden para actualizar el estado segun corresponda
    const webpayOrder = await WebpayOrder.findOne({ sessionId: tbkIdSesion })

    // Si se agota el tiempo de espera en el formulario de pago
    if (!token && !tbkToken) {
      // Se actualiza el estado de la orden y se guarda
      if (webpayOrder) {
      // Se comprueba si la orden ya tiene su estado para que no vuelva a relizar el proceso, 
        if (webpayOrder.status) return NextResponse.json({ timeout: true, ...response })
        webpayOrder.status = 'TIMEOUT'
        await webpayOrder.save()
      }
      
      return NextResponse.json({ timeout: true, ...response })
    }

    // Si el usuario preciona el boton de anular compra
    if (!token && tbkToken) {
      const statusResponse = await getStatus(tbkToken)

      // Se actualiza el estado de la orden y se guarda
      if (webpayOrder) {
      // Se comprueba si la orden ya tiene su estado para que no vuelva a relizar el proceso, 
        if (webpayOrder.status) return NextResponse.json({ canceled: true, ...response, statusResponse })
        webpayOrder.status = statusResponse.status
        await webpayOrder.save()
      }
      
      return NextResponse.json({ canceled: true, ...response, statusResponse })
    }

    // Si el pago es invalido por alguna razon
    if (token && tbkToken) {
      const statusResponse = await getStatus(token)

      // Se actualiza el estado de la orden y se guarda
      if (webpayOrder) {
      // Se comprueba si la orden ya tiene su estado para que no vuelva a relizar el proceso, 
        if (webpayOrder.status) return NextResponse.json({ invalid: true, ...response, statusResponse })
        webpayOrder.status = statusResponse.status
        await webpayOrder.save()
      }
      return NextResponse.json({ invalid: true, ...response })
    }
    
  } catch (error) {
    return NextResponse.json({ error: true, message:'ServerError ' + error })
  }
}