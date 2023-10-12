import { Model, models, model, Document, Schema } from 'mongoose'
import './Category'

interface Product extends Document {
  name: string;
  description: string;
  category: string[];
  price: number;
  size: string[];
  material?: string;
  stock?: number;
  colors: string[];
  details: string[];
  valuation?: string;
  brand: string;
  image: string[];
};

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  price: { type: Number, required: true },
  size: [{ type: String, required: true }],
  material: { type: String },
  stock: { type: Number },
  colors: [{ type: String }],
  details: [{ type: String }],
  valuation: { type: String },
  brand: { type: String },
  image: [{ type: String }]
})

const Product = models.Product || model('Product', ProductSchema)

export default Product as Model<Product>