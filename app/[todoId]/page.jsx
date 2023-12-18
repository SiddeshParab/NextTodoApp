'use client';
import TodoForm from '@/components/TodoForm';
import { useSearchParams } from 'next/navigation';
// import { useParams } from 'next/navigation';

const getTodoById = async (id) => {
  try {
    const res = await fetch(
      `https://next-skv-todo.vercel.app/api/todos/${id}`,
      {
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error('Failed to fetch todo');
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTodo({ params }) {
  const edit = useSearchParams().get('edit');
  const { todoId } = params;
  const data = await getTodoById(todoId);

  return (
    <section className='w-full flex flex-col items-center mt-3'>
      {edit ? (
        <>
          <h1 className='text-3xl font-bold'>Update todo</h1>
          <TodoForm todo={data?.todo} todoId={todoId} />
        </>
      ) : (
        <h1>Todo ID: {todoId}</h1>
      )}
    </section>
  );
}
