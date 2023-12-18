'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const TodoForm = (props) => {
  const router = useRouter();
  const params = useSearchParams();
  const edit = params.get('edit') || false;

  const [todoInput, setTodoInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const todoInputRef = useRef();

  useEffect(() => {
    if (edit) {
      setTodoInput(props.todo?.todo);
    }
    todoInputRef.current.focus();
  }, []);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const enteredTodo = todoInput.trim();
    if (enteredTodo.length < 1) return toast.error('todo input required!');

    if (edit) {
      try {
        setIsLoading(true);
        await axios.put(
          `https://next-skv-todo.vercel.app/api/todos/${props.todoId}`,
          {
            todo: enteredTodo,
          }
        );
        toast.success('todo updated successfully!');
        router.push('/');
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await axios.post('https://next-skv-todo.vercel.app/api/todos', {
          todo: enteredTodo,
        });
        toast.success('todo added successfully!');
        router.push('/');
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='mx-auto mt-8 w-full'>
      <form className='sm:flex sm:gap-4'>
        <div className='sm:flex-1'>
          <input
            onChange={(e) => setTodoInput(e.target.value)}
            value={todoInput}
            ref={todoInputRef}
            required
            type='text'
            placeholder='Add todo here...'
            className='w-full rounded-md ring-1 ring-gray-300 bg-transparent p-3 py-2 shadow-sm transition focus:border-none focus:outline-none focus:ring focus:ring-white'
          />
        </div>

        <button
          disabled={isLoading}
          onClick={submitFormHandler}
          type='submit'
          className='group mt-4 w-full rounded-md bg-blue-700 px-5 py-2 ring-1 ring-blue-700 text-white transition hover:bg-blue-600 focus:outline-none sm:mt-0 sm:w-auto disabled:bg-blue-400'
        >
          <span className='text-sm font-medium'>
            {!edit
              ? isLoading
                ? 'Adding todo...'
                : 'Add Todo'
              : isLoading
              ? 'Updating todo...'
              : 'Update Todo'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
