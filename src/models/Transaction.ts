import { Model, models, model, Document, Schema } from 'mongoose'
import './product'
import './user'

export interface TransactionDocument extends Document {
  user: string | Schema.Types.ObjectId,
  products: string[],
  authorization_code: string,
  card: {
    date_created: string,
    expiration_month: number,
    expiration_year: number,
    first_six_digits: string,
    last_four_digits: string
  },
  collector_id: number,
  currency_id: string,
  date_approved: string,
  date_created: string,
  description: string,
  id: number,
  installments: number,
  operation_type: string,
  order_id: string,
  order_type: string,
  payment_method_id: string,
  payment_type_id: string,
 status: string,
  transaction_amount: number,
  transaction_details: {
    installment_amount: number,
    net_received_amount: number,
    total_paid_amount: number
  }
}

const TransactionSchema = new Schema<TransactionDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  authorization_code: String,
  card: {
    date_created: Date,
    expiration_month: Number,
    expiration_year: Number,
    first_six_digits: String,
    last_four_digits: String
  },
  collector_id: Number,
  currency_id: String,
  date_approved: Date,
  date_created: Date,
  description: String,
  id: Number,
  installments: Number,
  operation_type: String,
  order_id: String,
  order_type: String,
  payment_method_id: String,
  payment_type_id: String,
  status: String,
  transaction_amount: Number,
  transaction_details: {
    installment_amount: Number,
    net_received_amount: Number,
    total_paid_amount: Number
  }
});

const Transaction = models.Transaction || model('Transaction', TransactionSchema)

export default Transaction as Model<TransactionDocument>

