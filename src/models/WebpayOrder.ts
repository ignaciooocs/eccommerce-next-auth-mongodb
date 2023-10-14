import { models, model, Model, Document, Schema } from 'mongoose'
import { TCart } from '@/types/Interfaces'
import './product'
import './user'

export interface IWebpayOrderDocument extends Document {
  userId?: string,
  cart: TCart,
  sessionId: string,
  amount: number,
  completed: boolean,
  transactionId: string | Schema.Types.ObjectId,
  status: string
}

const WebpayOrderSchema = new Schema<IWebpayOrderDocument>({
  cart: [{
    id_product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
  }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: Schema.Types.ObjectId, ref: 'WebpayTransaction' },
  sessionId: { type: String, required: true },
  amount: { type: Number, required: true },
  completed: { type: Boolean, required: true, default: false },
  status: { type: String, default: null }
},
{
  timestamps: true
})

const WebpayOrder = models.WebpayOrder || model<IWebpayOrderDocument>('WebpayOrder', WebpayOrderSchema)

export default WebpayOrder as Model<IWebpayOrderDocument>