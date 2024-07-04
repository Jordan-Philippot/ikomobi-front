import { Todo } from "@/lib/redux/types";
import React from "react";
import Button from "../ui/Button";

interface TodoItemProps {
  todo: Todo;
  onComplete: (todoId: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete }) => (
  <li key={todo.id} className="todo-item">
    {todo.text}
    <Button
      onClick={() => onComplete(todo.id)}
      label="Complete"
      color="outlined"
    />
  </li>
);

export default TodoItem;
