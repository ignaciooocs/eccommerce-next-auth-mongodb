import connectionDB from '@/libs/database';
import WebpayOrder from '@/models/WebpayOrder';
import User from '@/models/user';
import { getStatus, commitTransaction } from '@/utils/transbankMethods';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server'
import { handleAuthorizedPayment, handleFailedPayment, handleStatus } from '@/utils/paymentHandlers';

export async function POST (req: Request) {
try {
    const { token, tbkToken, tbkIdSesion, tbkOrdenCompra } = await req.json();
    const response = { tbkIdSesion, tbkOrdenCompra }
    if (!token && !tbkToken && !tbkIdSesion && !tbkOrdenCompra) return NextResponse.json(null)
    
    // Se busca el usuario que tiene la session activa (Usuario que esta realizando la compra)
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Debes iniciar sesion para realizar una compra' })

    await connectionDB()
    const user = await User.findOne({ email: session?.user?.email })

    // Si la transaccion se completa correctamente (se confirma)
    if (token && !tbkToken) { 
      const statusResponse = await getStatus(token)

      // Se busca la orden para conseguir los productos del carrito y actualizar sus propiedades
      const webpayOrder = await WebpayOrder.findOne({ sessionId: statusResponse.session_id }).populate('cart.id_product')
      if (!webpayOrder) return NextResponse.json({ error: 'No se encontro la orden' })
      
      // Se comprueba si la orden ya fue completada, 
      // Esto se hace principalmente por si el usuario recarga la pagina de retorno y no vuelva a pasar por el proceso de confirmacion
      if (webpayOrder.completed) return NextResponse.json({ ...statusResponse, products: webpayOrder.cart })

      // confirmacion de la transaccion
      const commitResponse = await commitTransaction(token)
      
      //
      ////////// Si el pago se a realizado corrrectamente
      //
      if (commitResponse.status === 'AUTHORIZED' && commitResponse.response_code === 0) {
        return NextResponse.json(await handleAuthorizedPayment({webpayOrder, user: user!, commitResponse, email: session?.user?.email as string }))
      }
      //
      ///////// Si el pago no se a realizado
      //
      if (commitResponse.status === "FAILED" && commitResponse.response_code === -1) {
        return NextResponse.json(await handleFailedPayment({webpayOrder, commitResponse, email: session?.user?.email as string }))
      }
    }
    // Se busca la orden para actualizar su estado segun corresponda
    const webpayOrder = await WebpayOrder.findOne({ sessionId: tbkIdSesion })
    if (!webpayOrder) return NextResponse.json({ error: 'No se encontro la orden' })

    // Si el usuario preciona el boton de anular compra:
    if (!token && tbkToken) {
      const statusResponse = await handleStatus({webpayOrder, token: tbkToken})
      return NextResponse.json({ canceled: true, ...statusResponse })
    }

    // Si el pago es invalido por alguna razon:
    if (token && tbkToken) {
      const statusResponse = await handleStatus({ webpayOrder, token })
      return NextResponse.json({ invalid: true, ...statusResponse })
    }

    // Si se agota el tiempo de espera en el formulario de pago:
    if (!token && !tbkToken) {
      // Se comprueba si la orden ya tiene su estado para que no vuelva a relizar el proceso, 
      if (!webpayOrder.status) {
        // Se actualiza el estado de la orden y se guarda
        webpayOrder.status = 'TIMEOUT'
        await webpayOrder.save()
      }
    
    return NextResponse.json({ timeout: true, ...response })
    }
    
  } catch (error) {
    return NextResponse.json({ error: true, message:'ServerError ' + error })
  }
}