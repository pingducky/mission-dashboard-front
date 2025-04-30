import { useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

interface ArchiveResponse {
  message: string;
  id: number;
  archived: boolean;
}

// Fonction pour archiver (désactiver) un employé avec le token
const archiveEmployee = async (id: number, token: string | null): Promise<ArchiveResponse> => {
  if (!token) {
    window.location.href = '/login';  // Rediriger vers la page de connexion si pas de token
    throw new Error('Token manquant');
  }

  const response = await fetch(`${API_URL}/employee/${id}/disable`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la désactivation de l'employé");
  }

  return await response.json();
};

// Hook pour archiver un employé
export const useArchiveEmployee = (token: string | null) => {
  return useMutation<ArchiveResponse, Error, number>({
    mutationFn: (id: number) => archiveEmployee(id, token),
    onSuccess: (data) => {
      console.log('Employé archivé avec succès:', data);
    },
    onError: (error) => {
      console.error('Erreur lors de l\'archivage de l\'employé', error.message);
    },
  });
};
