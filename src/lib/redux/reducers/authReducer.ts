import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: number | null;
  username: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userId: number;
        username: string;
        token: string;
      } | null>
    ) => {
      if (action.payload) {
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.token = action.payload.token;
      } else {
        state.userId = null;
        state.username = null;
        state.token = null;
      }
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
