"use client";
import { useAuth } from "@/lib/context/AuthContext";
import Button from "../ui/Button";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav>
        {isAuthenticated && <Button onClick={() => logout()} label="Logout" />}
      </nav>
    </header>
  );
};

export default Header;
