export default function PaymentFailed ({ buy_order }: { buy_order: string }) {
  return (
    <section className="flex flex-col items-center font-sans">
        <p className="text-3xl text-center py-4 text-red-600">No se realizó el pago ❌</p>
        <p className="text-center text-2xl py-4">Orden de Compra <span className="font-bold">{buy_order}</span> rechazada</p>
        <section className="p-8 flex flex-col gap-4">
          <p className="text-xl font-sans font-bold">Las posibles causas de este rechazo son:</p>
          <p>❗ Error en el ingreso de los datos de su tarjeta de crédito o débito (fecha y/o código de seguridad).</p>
          <p>❗ Su tarjeta de crédito o débito no cuenta con saldo suficiente.</p>
          <p>❗ Tarjeta aún no habilitada en el sistema financiero.</p>
        </section>
    </section>
  )
}