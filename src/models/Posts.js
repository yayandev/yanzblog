import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  categories: {
    // relasi dengan categories
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  body: {
    type: String,
    required: [true, "Body is required"],
  },
  id_author: {
    // relasi dengan user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.models.posts || mongoose.model("posts", PostsSchema);

export default Posts;
