import { connect } from "@/lib/database/config";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // 1. Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    // 2. Hash the password
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 3. Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Save the user
    const response = await user.save();

    // 5. Return the user
    return NextResponse.json({
      user: response,
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
