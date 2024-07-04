"use client";
import { useState } from "react";
import { useAuth } from "../lib/context/AuthContext";
import Title from "./ui/Title";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Field from "./ui/Field";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error: any) {
      console.error("Failed to login:", error);
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <main className="page-container">
      <div className="form-container custom-container">
        <Title weight="bold">Login</Title>
        <form onSubmit={handleLogin}>
          <Field
            label={"Username"}
            name="username"
            status={error ? "error" : "default"}
            required
            message={error ? error : ""}
          >
            <Input
              type="text"
              name="username"
              placeholder="John"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Field
            label={"Password"}
            name="password"
            status={error ? "error" : "default"}
            required
          >
            <Input
              type="password"
              name="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Button
            type="submit"
            disabled={!username || !password}
            label="Login"
          />
        </form>
      </div>
    </main>
  );
};

export default Home;
