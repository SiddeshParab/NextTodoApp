import Head from 'next/head';
import TodoList from '@/components/TodoList';
import axios from 'axios';

const getTodos = async () => {
  try {
    const res = await fetch(`https://next-skv-todo.vercel.app/api/todos`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch topic');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const { todos: newTodos } = await getTodos();

  const todos = newTodos.map((todo) => ({
    id: todo._id,
    todo: todo.todo,
    completed: todo.completed,
  }));

  return (
    <>
      <section className='w-full flex flex-col gap-10 items-center mt-3'>
        {todos.length > 0 && <h1 className='text-3xl font-bold'>All Todos</h1>}
        <TodoList todos={todos} />
      </section>
    </>
  );
}
