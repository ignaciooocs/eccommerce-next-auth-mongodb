import { Model, models, model, Document, Schema } from 'mongoose'
import './product'

interface CategoryDocument extends Document {
  name: string
  products: string[]
}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }]
},
{
  timestamps: true
})

const Category = models.Category || model('Category', CategorySchema)

export default Category as Model<CategoryDocument>