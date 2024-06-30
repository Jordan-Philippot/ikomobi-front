"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  fetchTodos,
  addTodo,
  completeTodo,
} from "@/redux/reducers/todoReducer";

const Todos = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { todos, status } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos(token));
    }
  }, [token, dispatch]);

  const handleAddTodo = () => {
    if (text.length > 0 && text.length <= 50) {
      dispatch(addTodo({ text, token: token as string }));
      setText("");
    }
  };

  const handleCompleteTodo = (id: number) => {
    dispatch(completeTodo({ id, token: token as string }));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={50}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo} disabled={!text}>
          Add Task
        </button>
      </div>
      <ul className="todo-list">
        {status === "loading" && <li>Loading...</li>}
        {status === "success" &&
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleCompleteTodo(todo.id)}>
                Complete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
