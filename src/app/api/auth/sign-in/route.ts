import { NextResponse } from 'next/server';
import User from '@/models/user'
import connectionDB from '@/libs/database';

interface IUserRequest { email: string, password: string }

interface IUserResponse {
    _id: string, 
    name: string, 
    email: string, 
    username: string, 
    cart: string[],
    createdAt: string, 
    updatedAt: string
}

type NewResponse = NextResponse<{ user?: IUserResponse; error?: string}>

export async function POST (req: Request): Promise<NewResponse> {
  const { email, password } = await req.json() as IUserRequest
  try {
    await connectionDB()
    const userFound = await User.findOne({ email })

    if (!userFound) return NextResponse.json({ error: 'El correo o contraseña son incorrectos' })

    const validatePassword = await userFound.comparePassword(password)

    if (!validatePassword) return NextResponse.json({ error: 'El correo o contraseña son incorrectos' })

    const { _id, name, username, cart, createdAt, updatedAt } = userFound

    return NextResponse.json({
      user: {
        _id, 
        email,
        name, 
        username, 
        cart, 
        createdAt, 
        updatedAt
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error en el login' })
  }
}