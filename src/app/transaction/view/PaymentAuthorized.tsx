'use client'
import { CartItem } from "@/types/Interfaces";
import { dateFormat, formatoNumero, typePayment, typeQuota } from "@/utils/format";

export default function PaymentAuthorized ({ data }: any) {
  console.log(data)
  return (
    <section className="flex flex-col items-center">
      <p className="text-3xl font-sans text-center">El pago se a realizado correctamente! ✔</p>
      <section className="p-8 flex flex-col gap-4 w-full">
        <p className="text-xl font-sans font-bold">Detalles de la compra:</p>
        <p>Tienda: Ecommerce</p>
        <p>Monto de compra: {formatoNumero.format(data.amount)}</p>
        <p>Codigo de autorizacion: {data.authorization_code}</p>
        <p>Fecha: {dateFormat(data.transaction_date)}</p>
        <p>Tipo de pago: {typePayment(data.payment_type_code)}</p>
        <p>Cantidad de cuotas: {data.installments_number}</p>
        <p>Tipo de cuota: {typeQuota(data.payment_type_code)}</p>
        {data.installments_number > 0 && <p>Monto de cuotas: {formatoNumero.format(data.installments_amount)}</p>}
        <p>Últimos dígitos de la tarjeta: {data.card_detail.card_number}</p>
      </section>
      <section className="p-8 flex flex-col gap-4 w-full">
      <p className="text-xl font-sans font-bold">Detalles de los Productos:</p>
        {data.products?.map(({ id_product, quantity }: CartItem) => (
          <li key={id_product._id} className="list-none">
            <p>Nombre: {id_product.name}</p>
            <p>Description: {id_product.description}</p>
            <p>Cantidad: {quantity}</p>
            <p>Precio: {id_product.price}</p>
          </li>
        ))}
      </section>
    </section>
  )
}