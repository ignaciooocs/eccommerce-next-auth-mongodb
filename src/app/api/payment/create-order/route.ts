import { NextResponse } from "next/server";
import mercadopago from 'mercadopago'
import { CartItem } from "@/types/Interfaces";
import { getServerSession } from "next-auth/next";
import User from "@/models/user";

export async function POST (req: Request) {
  const body = await req.json()
  
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MERCADOPAGO as string
  })
  
  try {
    const session = await getServerSession()
    const user = await User.findOne({ email: session?.user?.email })

    const items = body.map(({id_product: product, quantity}: CartItem) => ({
      title: product.name,
      unit_price: product.price,
      currency_id: 'CLP',
      quantity,
      description: product.description,
      picture_url: product.image[0],
      id: product._id,
      category_id: product.category[0]
    }))
    
    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: 'http://localhost:3000/',
        failure: 'http://localhost:3000/cart',
        pending: 'http://localhost:3000/'
      },
      notification_url: `https://chj8mbsz-3000.brs.devtunnels.ms/api/payment/webhook?userid=${user?._id}`
    })

    console.log(result.body.init_point)
    return NextResponse.json(result.body)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al crear la orden', message: error })
  }
}