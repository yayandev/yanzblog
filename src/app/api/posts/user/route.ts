import { connect } from "@/lib/database/config";
import Posts from "@/models/Posts";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();
// get posts milik user
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const posts = await Posts.find({ author: userId });
    return NextResponse.json({
      message: "Posts found",
      data: posts.length,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
