import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/lib/database/config";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password -__v");
    return NextResponse.json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
