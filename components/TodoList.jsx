'use client';

import axios from 'axios';
import Link from 'next/link';
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';
import { GoCheckCircleFill, GoCheckCircle } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TodoList = (props) => {
  const router = useRouter();

  const removeTodo = async (id) => {
    try {
      await axios.delete(
        `https://next-skv-todo.vercel.app/api/todos?todoId=${id}`
      );
      toast.success('Todo deleted successfully!');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put(`https://next-skv-todo.vercel.app/api/todos/${id}`, {
        completed: true,
      });
      toast.success('Todo completed successfully!');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className='flex w-full flex-col items-center justify-center gap-3'>
      {props.todos.length > 0 ? (
        props.todos.map((todo) => (
          <li
            key={todo.id}
            className='w-full p-4 border border-slate-300 flex justify-between gap-5 items-center'
          >
            <div className='flex items-center justify-center gap-2'>
              {!todo.completed ? (
                <button onClick={() => markComplete(todo.id)}>
                  <GoCheckCircle
                    className='text-white hover:text-green-600 transition'
                    size={24}
                  />
                </button>
              ) : (
                <GoCheckCircleFill className='text-green-600' size={24} />
              )}
              <h2 className='font-semibold text-lg'>{todo.todo}</h2>
            </div>
            <div className='flex gap-2'>
              <button onClick={() => removeTodo(todo.id)}>
                <HiOutlineTrash className='text-red-400' size={24} />
              </button>
              {!todo.completed && (
                <Link href={`/${todo.id}?edit=true`}>
                  <HiPencilAlt size={24} />
                </Link>
              )}
            </div>
          </li>
        ))
      ) : (
        <h1 className='text-3xl font-bold text-cyan-300'>No todos found!</h1>
      )}
    </ul>
  );
};

export default TodoList;
