import { NextResponse } from 'next/server'
import Product from '@/models/product' 
import connectionDB from '@/libs/database'
import Category from '@/models/Category'

export async function POST (req: Request) {
  const body = await req.json()
  try {
    await connectionDB()

    const product = await Product.create({ ...body })
    
    body.category.map(async (c: string) => {
      const category = await Category.findById(c)
      category?.products.push(product._id)
      await category?.save()
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al agregar un producto' })
  }
}

export async function GET () {
  try {
    await connectionDB()
    
    const products = await Product.find({}).populate('category')
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al obtener los productos ' + error })
  }
}

export async function PUT () {
  try {
    await connectionDB()

    const products = await Product.find({})
    products.map(async product => {
      const precio = product.price.toString()
      product.price = Number(precio.split('.').join(''))
      await product.save()
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Ocurrio un error al actualizar los productos' })
  }
}