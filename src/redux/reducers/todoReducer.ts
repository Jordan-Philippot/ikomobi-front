import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";

interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTodosFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
    completeTodo(state, action: PayloadAction<number>) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodo,
  completeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
