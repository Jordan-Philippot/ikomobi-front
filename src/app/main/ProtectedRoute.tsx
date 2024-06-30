"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

export default function ProtectedRoute() {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{""}</>;
}
