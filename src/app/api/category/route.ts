import connectionDB from '@/libs/database'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    await connectionDB()

    const categories = await Category.find({})
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las categorias', status: 400 })
  }
}

export async function POST (req: Request) {
  const body = await req.json()
  try {
    await connectionDB()
    const category = await Category.create({ ...body })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'No se agrego la categoria ' + error, status: 400 })
  }
}

export async function DELETE () {
  try {
    await connectionDB()
    const category = await Category.findByIdAndDelete('6519dc751169ad7f64b45b5a')
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'No se elimino la categoria', status: 400 })
  }
}