import mongoose, { Schema } from 'mongoose';

const todoScheme = new Schema(
  {
    todo: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoScheme);

export default Todo;
