import { Todo } from "@/redux/types";

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onComplete(todo.id)}>Complete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
