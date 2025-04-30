import { useQuery } from '@tanstack/react-query';

export type Role = {
  /**
   * Id du role
   */
  id: number;
  /**
   * Libelle court
   */
  shortLibel: string;
  /**
   * Libelle long
   */
  longLibel: string;
};

const fetchRoles = async (): Promise<Role[]> => {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/role/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des rôles');
  }

  return await response.json();
};

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });
};
