import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducer";
import authReducer from "./reducers/authReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
