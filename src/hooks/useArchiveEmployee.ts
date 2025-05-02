import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const archiveEmployee = async (id: number) => {
  const res = await fetch(`${API_URL}/employee/${id}/disable`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.error || "Erreur lors de l'archivage du salarié");
  }
};

export const useArchiveEmployee = () => {
  return useMutation({
    mutationFn: (id: number) => archiveEmployee(id),
  });
};
