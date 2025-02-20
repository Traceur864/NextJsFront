"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirige si no hay token
    }
  }, []);

  return null;
};

export default useAuthRedirect;
