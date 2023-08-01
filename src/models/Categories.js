import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    // relasi dengan user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Categories =
  mongoose.models.categories || mongoose.model("categories", CategoriesSchema);

export default Categories;
