import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { TCart } from '@/types/Interfaces'
import './product'

interface IUserDocument extends Document {
  email: string
  name: string
  username: string
  googleId: string
  password: string;
  image: string;
  cart: TCart;
  createdAt: string, 
  updatedAt: string;
  transactions: string[]
  webpayOrders: string[]
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema<IUserDocument, {}, Methods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  googleId: { type: String },
  password: { type: String },
  image: { type: String }, 
  cart: [{
    id_product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
  }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  webpayOrders: [{ type: Schema.Types.ObjectId, ref: 'WebpayOrder' }]
},
{
  timestamps: true,
  versionKey: false
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
      throw error
    }
    next()
  }
})

UserSchema.methods.comparePassword = async function (password) {
  try {
    if (!this.password) return false

    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = models.User || model('User', UserSchema)

export default User as Model<IUserDocument, {}, Methods>