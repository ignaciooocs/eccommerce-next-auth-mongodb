import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import User from '@/models/user'
import connectionDB from '@/libs/database'
import { CartItem, TCart } from '@/types/Interfaces'

export async function POST (req: Request, { params }: { params: { id: string }}) {
  const { id } = params
  const { quantity } = await req.json()
  try {
    const session = await getServerSession()

    if (!session?.user) return NextResponse.json({ error: 'No estas iniciado' })

    await connectionDB()
    
    const user = await User.findOne({ email: session?.user?.email })
    if (!user) return NextResponse.json({ error: 'Usuario no existe' })

    const product = { id_product: id, quantity } as CartItem
    user.cart.push(product)

    await user.save()
 
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar al carrito' })
  }
}

export async function DELETE (req: Request, { params }: { params: { id: string }}) {
  const { id } = params
  try {
    const session = await getServerSession()

    if (!session?.user) return NextResponse.json({ error: 'No estas iniciado' })

    await connectionDB()

    const user = await User.findOne({ email: session.user?.email }).populate('cart.id_product')

    if (!user) return NextResponse.json({ error: 'Usuario no existe' })

    user.cart = user.cart.filter((product) => product.id_product._id.toString() !== id.toString())
    await user.save()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'No se elimino el producto' })
  }
}

//editar cantidad de tal producto en el carrito 

export async function PUT (req: Request, { params }: { params: { id: string }}) {
  const { method } = await req.json()
  const { id } = params
  try {
    const session = await getServerSession()

    if (!session) return NextResponse.json({ error: 'No estas iniciado' })

    await connectionDB()

    const user = await User.findOne({ email: session.user?.email })

    if (!user) return NextResponse.json({ error: 'No existe el usuario '})
    user?.cart.map((product) => {
      if (product.id_product._id.toString() === id.toString()) {
        product.quantity = method ? product.quantity + 1 : product.quantity - 1
      }
    })
    user.cart = user.cart.filter((product) => product.quantity > 0)

    await user.save()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'No se actualizo el producto' })
  }
}