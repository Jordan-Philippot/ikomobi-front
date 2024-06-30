import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  status: "start" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "start",
  error: null,
};

const port = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (token: string) => {
    const response = await axios.get(port + "/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ text, token }: { text: string; token: string }) => {
    const response = await axios.post(
      port + "/todos",
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async ({ id, token }: { id: number; token: string }) => {
    await axios.delete(port + `/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
