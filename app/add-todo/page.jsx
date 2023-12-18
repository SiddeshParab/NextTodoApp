import TodoForm from '@/components/TodoForm';

const NewTodo = () => {
  return (
    <section className='w-full flex flex-col items-center mt-3'>
      <h1 className='text-3xl font-bold'>Add new todo</h1>
      <TodoForm />
    </section>
  );
};

export default NewTodo;
