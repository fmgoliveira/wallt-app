import mongoose, { Schema } from 'mongoose';

export interface Category {
  icon: string;
  color: string;
  name: string;
}

const CategorySchema = new Schema<Category>({
  icon: { type: String, required: true },
  color: { type: String, required: true },
  name: { type: String, required: true },
});

export default mongoose.models.categories || mongoose.model('categories', CategorySchema);