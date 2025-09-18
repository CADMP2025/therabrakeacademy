import { NextResponse } from 'next/server';

// GET - Fetch courses
export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: []
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete course
export async function DELETE(request) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
