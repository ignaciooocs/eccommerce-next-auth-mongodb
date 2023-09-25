import { NextResponse } from 'next/server'
import User from '../../../models/user'
import connectionDB from '@/libs/database'

interface NewUserRequest {
  _id: string
  name: string
  email: string
  password: string
  username: string
}

interface NewUserResponse {
  _id: string 
  email: string
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string}>

export async function POST (req: Request): Promise<NewResponse> {
  const body = await req.json() as NewUserRequest
  try {
    await connectionDB()
    
    const oldUser = await User.findOne({ email: body.email })
    if (oldUser) {
      return NextResponse.json(
        { error: 'El correo ya esta en uso' },
        { status: 422 }
      )
    }
    const user = await User.create({ ...body })
    
    const { _id, email } = user

    return NextResponse.json({ 
      user: { 
        _id,
        email,
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error en el registro ' + error })
  }
}