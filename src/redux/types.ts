export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface RootState {
  todos: Todo[];
  auth: AuthState;
}

export interface AuthState {
  token: string | null;
  user: string | null;
  error: string | null;
  loading: boolean;
}
