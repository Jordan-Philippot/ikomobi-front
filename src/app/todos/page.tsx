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
import useMessage from "@/lib/hooks/useMessage";

const Todos = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const { todos, status } = useSelector((state: RootState) => state.todos);
  const { sendSuccess } = useMessage();

  useEffect(() => {
    if (token && userId) {
      dispatch(fetchTodos({ token, userId }));
    }
  }, [token, dispatch]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.length > 0 && text.length <= 50) {
      dispatch(addTodo({ userId, text, token: token as string }));
      setText("");
      sendSuccess("Task added");
    }
  };

  const handleCompleteTodo = (id: any) => {
    dispatch(completeTodo({ id, token: token as string }));
    sendSuccess("Task completed");
  };

  return (
    <main className="page-container">
      <div className="custom-container">
        <Title weight="bold">Todo List</Title>
        <Title weight="bold" size="h2">
          User : {userId}
        </Title>
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
