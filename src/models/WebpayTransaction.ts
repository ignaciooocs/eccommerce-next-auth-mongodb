import { Document, Schema, model, models, Model } from 'mongoose';
import './WebpayOrder'

export interface IWebpayTransaction extends Document {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  card_detail: {
    card_number: string;
  };
  accounting_date: string;
  transaction_date: Date;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
  installments_amount?: number;
  orderId: string | Schema.Types.ObjectId
}

const TransactionSchema = new Schema<IWebpayTransaction>({
  vci: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  buy_order: { type: String, required: true },
  card_detail: {
    card_number: { type: String, required: true },
  },
  accounting_date: { type: String, required: true },
  transaction_date: { type : Date, required : true },
  authorization_code: { type : String, required : true },
  payment_type_code : { type : String, required : true },
  response_code : { type : Number, required : true },
  installments_number : { type : Number, required : true },
  installments_amount: { type: Number  },
  orderId: { type: Schema.Types.ObjectId, ref: 'WebpayOrder' }
},
{
  timestamps: true
});

const WebpayTransaction = models.WebpayTransaction || model<IWebpayTransaction>('WebpayTransaction', TransactionSchema);

export default WebpayTransaction as Model<IWebpayTransaction>