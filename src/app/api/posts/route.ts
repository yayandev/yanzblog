import { connect } from "@/lib/database/config";
import Posts from "@/models/Posts";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

// get all posts
export async function GET(request: NextRequest) {
  try {
    const posts = await Posts.find();
    return NextResponse.json({
      message: "Posts found",
      data: posts,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// create posts
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });
    const { title, body, categories } = reqBody;

    const post = new Posts({
      title,
      body,
      categories,
      id_author: userId,
      author: user.name,
    });

    const response = await post.save();
    return NextResponse.json({
      message: "Post created successfully",
      data: response,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
