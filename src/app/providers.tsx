"use client";
import { Provider } from "react-redux";
import store from "../lib/redux/store";
import { AuthProvider } from "../lib/context/AuthContext";
import Messages from "./main/Messages";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
      <Messages />
    </Provider>
  );
}

export default Providers;
