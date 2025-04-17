import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const logoutRequest = async (token: string) => {
  if (!token) return;

  const res = await fetch(`${API_URL}/auth/disconnect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }

  return res.json();
};

export const useLogout = () => {
  return useMutation({
    mutationFn: (token: string) => logoutRequest(token),
  });
};
