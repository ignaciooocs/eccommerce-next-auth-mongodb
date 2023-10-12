import connectionDB from '@/libs/database'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET (req: Request, { params }: { params: { id: string }}) {
  const { id } = params
  try {
    await connectionDB()
    const category = await Category.findById(id)
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al obtener una categoria', status: 400 })
  }
}