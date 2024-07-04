"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import {
  fetchTodos,
  addTodo,
  completeTodo,
} from "@/lib/redux/reducers/todoReducer";
import Title from "../ui/Title";
import Input from "../ui/Input";
import Field from "../ui/Field";
import Button from "../ui/Button";
import LoaderSuspense from "../ui/LoaderSuspense";
import TodoItem from "./Todo";

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

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.length > 0 && text.length <= 50) {
      dispatch(addTodo({ text, token: token as string }));
      setText("");
    }
  };

  const handleCompleteTodo = (id: number) => {
    dispatch(completeTodo({ id, token: token as string }));
  };

  return (
    <main className="page-container">
      <div className="custom-container">
        <Title weight="bold">Todo List</Title>
        <form className="add-todo" onSubmit={handleAddTodo}>
          <Field label={"Add a new task"} name="todo" required>
            <Input
              type="text"
              name="todo"
              placeholder="Join Ikomobi"
              value={text}
              maxLength={50}
              onChange={(e) => setText(e.target.value)}
            />
          </Field>

          <Button onClick={handleAddTodo} disabled={!text} label="Add Task" />
        </form>
        <div className="todo-list-container">
          <Title size="h3" weight="bold">
            To do :
          </Title>
          <ul className="todo-list">
            {status === "loading" && <LoaderSuspense />}
            {status === "success" &&
              todos.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  onComplete={() => handleCompleteTodo(todo.id)}
                />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Todos;
