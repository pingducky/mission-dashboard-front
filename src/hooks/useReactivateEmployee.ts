import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const reactivateEmployee = async (id: number) => {
  const res = await fetch(`${API_URL}/employee/${id}/activate`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.error || "Erreur lors de la réactivation du salarié");
  }
};

export const useReactivateEmployee = () => {
  return useMutation({
    mutationFn: (id: number) => reactivateEmployee(id),
  });
};
