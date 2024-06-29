import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addTodo } from "@/redux/reducers/todoReducer";

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && text.length <= 50) {
      dispatch(
        addTodo({
          id: Date.now(),
          text,
          completed: false,
        })
      );
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
        maxLength={50}
      />
      <button type="submit" disabled={!text.trim()}>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
