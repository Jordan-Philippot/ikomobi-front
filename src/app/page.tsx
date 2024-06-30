"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/reducers/authReducer";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const URI_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

  const handleLogin = async () => {
    try {
      const response = await axios.post(URI_ENDPOINT + "/login", {
        username,
        password,
      });
      // dispatch(setToken("ok"));

      dispatch(setToken(response.data.token));
      router.push("/todos");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!username || !password}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
