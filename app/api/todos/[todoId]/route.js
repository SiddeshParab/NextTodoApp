import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Todo from '@/models/Todo';

export async function PUT(req, { params }) {
  const { todoId } = params;
  const body = await req.json();

  try {
    await connectMongoDB();

    await Todo.findByIdAndUpdate(todoId, body);

    return NextResponse.json({ message: 'todo updated' }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(req, { params }) {
  const { todoId } = params;

  try {
    await connectMongoDB();

    const todo = await Todo.findOne({ _id: todoId });

    return NextResponse.json({ todo }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
