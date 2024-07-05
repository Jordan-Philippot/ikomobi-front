import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib//types/status";

export interface Message {
  text: string;
  status: Status;
  date: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface AppStateProps {
  messages: Message[];
}

const initialState = { messages: [] } as AppStateProps;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMessage(
      state,
      action: PayloadAction<{
        text: string;
        status: Status;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
      }>
    ) {
      const date = new Date().getTime();
      state.messages.push({ ...action.payload, date: date });
    },
  },
});

export const { createMessage } = messageSlice.actions;
export default messageSlice.reducer;
