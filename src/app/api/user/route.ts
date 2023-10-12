import connectionDB from '@/libs/database'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import User from '@/models/user'
import { options } from '../auth/[...nextauth]/options'

export async function GET (req: Request) {
  try {   
    const session = await getServerSession(options)
    if (!session) return NextResponse.json({ error: 'No estas iniciado' })

    await connectionDB()

    const user = await User.findOne({ email: session.user?.email }).populate('cart.id_product')

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al obtener el usuario '})
  }
}
