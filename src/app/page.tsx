"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  completeTodo,
} from "../redux/reducers/todoReducer";
import axios from "axios";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";

const Home = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(fetchTodosStart());
      try {
        const response = await axios.get("/api/todos");
        dispatch(fetchTodosSuccess(response.data));
      } catch (error) {
        // dispatch(fetchTodosFailure(error?.message));
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleComplete = (id: number) => {
    dispatch(completeTodo(id));
  };

  return (
    <main>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todos={todos} onComplete={handleComplete} />
    </main>
  );
};

export default Home;
