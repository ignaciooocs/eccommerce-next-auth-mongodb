import { TCart } from "@/types/Interfaces"
import { modifyStock } from "./changeProduct"
import { IWebpayOrderDocument } from "@/models/WebpayOrder"
import WebpayTransaction, { IWebpayTransaction } from "@/models/WebpayTransaction"
import { IUserDocument } from "@/models/user"
import { SendEmailAuthorized, SendEmailFailed } from "../../sendEmails"
import { getStatus } from "./transbankMethods"

// Funcion para manejar la transaccion autorizada
export async function handleAuthorizedPayment({webpayOrder, user, commitResponse, email}: { webpayOrder: IWebpayOrderDocument, user: IUserDocument, commitResponse: IWebpayTransaction, email: string }) {
  await modifyStock({ cart: webpayOrder?.cart as TCart })
    // Se vacia el carrito de compras
    user!.cart = [] 
    await user!.save()

    // Se crea una transaccion con los datos recibidos de webpay
    const webpaytransaction = await WebpayTransaction.create({ ...commitResponse, orderId: webpayOrder._id })

    // La orden se pasa a completada, se le agrega el estado, el id de la transaccion y se guarda
    webpayOrder.completed = true
    webpayOrder.transactionId = webpaytransaction._id
    webpayOrder.status = commitResponse.status
    await webpayOrder.save()

    // Se envia un correo al usuario con los detalles de la compra
    SendEmailAuthorized({email, commitResponse, products: webpayOrder.cart })

    // Finalmente se envia la respuesta al cliente
    return { ...commitResponse, products: webpayOrder.cart }
}

// Funcion para manjar la transaccion fallida
export async function handleFailedPayment({webpayOrder, commitResponse, email}: { webpayOrder: IWebpayOrderDocument, commitResponse: IWebpayTransaction, email: string }) {
   // Se crea una transaccion con los datos recibidos de webpay
   const webpaytransaction = await WebpayTransaction.create({ ...commitResponse, orderId: webpayOrder._id })

   // La orden se pasa a completada, se le agrega el id de la transaccion y el status, y luego se guarda.
   webpayOrder.completed = true
   webpayOrder.transactionId = webpaytransaction._id
   webpayOrder.status = commitResponse.status
   await webpayOrder.save()

   // Se envia un correo al usuario que realizo la transaccion indicandoole que NO se realizo el pago
   SendEmailFailed({ email, buy_order: commitResponse.buy_order })

   return { ...commitResponse, products: webpayOrder!.cart }
}

// Funcion pora manejar el estado de la transaccion
export async function handleStatus({webpayOrder, token}: { webpayOrder: IWebpayOrderDocument, token: string }) {
  const statusResponse = await getStatus(token)
  // Se comprueba si la orden ya tiene su estado para que no vuelva a relizar el proceso, 
  if (!webpayOrder.status) {
  // Se actualiza el estado de la orden y se guarda
    webpayOrder.status = statusResponse.status
    console.log(webpayOrder.status)
    await webpayOrder.save()
  }
  return statusResponse
}
