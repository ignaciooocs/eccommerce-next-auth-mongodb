import { NextRequest, NextResponse } from 'next/server'
import mercadopago from 'mercadopago'
import Transaction from '@/models/Transaction'
import User from '@/models/user'
import connectionDB from '@/libs/database'
import { createTransaction } from '@/utils/transaction'
import Product from '@/models/product'

export async function POST (req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const id = searchParams.get("data.id")
  const type = searchParams.get("type")
  const userid = searchParams.get("userid")

  try {
    if (type === 'payment') {
      console.log('Dentro del if')

      await connectionDB()
      const user = await User.findById(userid)

      const data = await mercadopago.payment.findById(Number(id))

      const { items } = data.response.additional_info
      const { response } = data

      if (data.response.status === 'approved') {   
        // Se crea una nueva instancia de la transaccion y se guarda en la base de datos
        const newTransaction = createTransaction(items, response)

        const transactionSaved = await Transaction.create({ user: userid, ...newTransaction })
        console.log(transactionSaved, 'transaccion guardada')

        // Agragar el id de la transaccion a las transacciones del usuario
        user?.transactions.push(transactionSaved._id)
        if (user?.cart) user.cart = []
        await user?.save()

        // Descontar la cantidad comprada a cada producto
        items.forEach(async (p: any) => {
          const { id, quantity } = p
          const product = await Product.findById(id)
          if (product && product.stock) {
            product.stock = product.stock - quantity
            await product.save()
            console.log(`Se descontaron ${quantity} del producto ${product.name}`)
          }
        });
        console.log('El pago se realizo correctamente')
        return NextResponse.json({ status: 200 })
      } 
      if (data.response.status === 'rejected') {
        // Se crea una nueva instancia de la transaccion y se guarda en la base de datos
        const newTransaction = createTransaction(items, response)
        
        const transactionSaved = await Transaction.create({ user: userid, ...newTransaction })
        console.log(transactionSaved, 'transaccion guardada')

        // Agragar el id de la transaccion a las transacciones del usuario
        user?.transactions.push(transactionSaved._id)
        await user?.save()
        
        console.log('El pago ha fallado')
        return NextResponse.json({ status: 400 })
      }
    }
    return NextResponse.json({ status: 400 })
  } catch (error) {
    console.log('No se realizo el pago', error)
    return NextResponse.json({ error: 'Ocurrio un error en el webhook' })
  }
}