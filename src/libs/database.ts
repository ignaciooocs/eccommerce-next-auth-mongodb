import mongoose from 'mongoose'

const url = process.env.DATABASE_URI as string
let connection: typeof mongoose

const connectionDB = async () =>  {
  try {
    if (!connection) connection = await mongoose.connect(url)
    console.log('connected')
  return connection
  } catch (error) {
    console.log('error database')
  }
  
}

export default connectionDB