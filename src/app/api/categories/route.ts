import { connect } from "@/lib/database/config";
import Categories from "@/models/Categories";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function GET(request: NextRequest) {
  try {
    const categories = await Categories.find();
    return NextResponse.json({
      message: "Categories found",
      data: categories,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);
    const { name } = reqBody;

    const category = new Categories({
      name,
      author: userId,
    });

    const response = await category.save();
    return NextResponse.json({
      message: "Category created",
      data: response,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);
    const { id } = reqBody;

    // check apakah ada categories dengan id id
    const category = await Categories.findById(id);
    if (!category) {
      return NextResponse.json({
        message: "Category not found",
        success: false,
      });
    }

    // cek apakah user yang menghapus categories
    if (category.author.toString() !== userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    // delete categories
    const response = await Categories.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Category deleted",
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
