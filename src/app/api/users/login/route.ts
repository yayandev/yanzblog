import { connect } from "@/lib/database/config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // 1. Check if the user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "Email or password wrong!",
        success: false,
      });
    }

    // 2. Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Email or password wrong!",
        success: false,
      });
    }
    // 3. Crate a token data
    const tokenData = { id: user._id, name: user.name, email: user.email };
    // 4. Create a token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
