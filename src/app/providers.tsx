"use client";
import { Provider } from "react-redux";
import store from "../redux/store";
import ProtectedRoute from "./main/ProtectedRoute";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ProtectedRoute />
      {children}
    </Provider>
  );
}

export default Providers;
