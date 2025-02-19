"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const useAuthRedirect = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Si no hay usuario, redirige al login
    }
  }, [user, router]);
};

export default useAuthRedirect;
