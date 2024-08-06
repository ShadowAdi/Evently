import mongoose, { model, models } from "mongoose";
import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: true,
    unique: true,
  },
});


const Category=models.Category || model("Category",CategorySchema)
export default Category