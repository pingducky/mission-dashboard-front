import { useQuery } from '@tanstack/react-query';
import { getUserDataFromToken } from '../utils/auth';

// export const getUserById = async (id: string, token: string) => {
//     const API_URL = import.meta.env.VITE_API_URL;

//     return await fetch(`${API_URL}/employee/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//     })
//     .then(response => {
//         return response.json();
//     })
//     .catch(error => {
//         throw error;
//     });
// };

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  email: string;
  address: string | null;
  notificationMail: boolean;
  notificationSms: boolean;
  isEnabled: boolean;
};

const fetchUserById = async (id: string, token: string): Promise<User> => {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/employee/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données utilisateur');
  }

  return await response.json();
};

export const useUserData = () => {
  const userInfo = getUserDataFromToken();

  return useQuery({
      queryKey: ['userData', userInfo?.id],
      queryFn: () => {
          if (!userInfo) throw new Error('Aucun token ou ID utilisateur');
          return fetchUserById(userInfo.id, userInfo.token);
      },
      enabled: !!userInfo, // empêche le fetch si pas d'infos
  });
};