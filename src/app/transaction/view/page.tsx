'use client'
import { redirect, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import PaymentAuthorized from "./PaymentAuthorized"
import PaymentFailed from "./PaymentFailed"
import Link from "next/link"

export default function Transaction () {
  const { get } = useSearchParams()
  const token = get('token_ws')
  const tbkToken = get('TBK_TOKEN')
  const tbkOrdenCompra = get('TBK_ORDEN_COMPRA')
  const tbkIdSesion = get('TBK_ID_SESION')

  const viewOrder = async () => {
    try {   
      const res = await fetch('/api/transbank/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, tbkToken, tbkIdSesion, tbkOrdenCompra })
      })
      const data = await res.json()
      return data
     
    } catch (error) {
      return null
    }
  }

  const { data, isLoading, error } = useQuery({
    queryFn: viewOrder,
    queryKey: ['ViewTransaction'],
    onSuccess: () => {
      console.log('success')
    }
  })

  if (isLoading) return <section className="flex justify-center items-center h-full py-8 font-sans font-bold text-center text-2xl">Espere mientras se completa la transacción</section>
  if (error) return <section>error</section>
  if (!data) return redirect('/')

  console.log(data)
  return  (
    <section className="flex flex-col items-center">
      {data.status === 'AUTHORIZED' && <PaymentAuthorized data={data} />}
      {data.status === "FAILED" && <PaymentFailed buy_order={data.buy_order} />}
      {data.canceled && <section>El pago a sido anulado</section>}
      {data.invalid && <section>El pago es invalido</section>}
      {data.timeout && <section>Se agoto el tiempo de espera, vuelva a intentarlo</section>}
      <section className="p-6">
        <Link className="p-3 font-sans font-bold bg-blue-500 text-white rounded-md" href='/'>Volver</Link>
      </section>
    </section>
  )
}
