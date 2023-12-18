import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Todo from '@/models/Todo';

export async function POST(req) {
  const body = await req.json();
  try {
    await connectMongoDB();
    await Todo.create(body);
    return NextResponse.json({ message: 'Todo created' }, { status: 201 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(req) {
  const completed = req.nextUrl.searchParams.get('completed') || false;

  try {
    await connectMongoDB();
    let todos;
    if (completed)
      todos = await Todo.find({ completed }).sort({ updatedAt: -1 });
    else todos = await Todo.find({ completed }).sort({ createdAt: 1 });
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function DELETE(req) {
  const todoId = req.nextUrl.searchParams.get('todoId');

  try {
    await connectMongoDB();
    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json({ message: 'Todo Deleted' }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
