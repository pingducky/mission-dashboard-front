import { useQuery } from '@tanstack/react-query';
import { getUserDataFromToken } from '../utils/auth';

export type User = {
  /** 
   * Id de l'utilisateur, utilisé pour l'identifier de manière unique.
   **/ 
  id: number;
  /** 
   * Prénom de l'utilisateur. 
   */ 
  firstName: string;
  /** 
   * Nom de famille de l'utilisateur. 
   */ 
  lastName: string;
  /** 
   * Mot de passe de l'utilisateur. 
   */ 
  password: string;
  /** 
   * Numéro de téléphone de l'utilisateur. 
   */ 
  phoneNumber: string;
  /** 
   * Adresse email de l'utilisateur. 
   */ 
  email: string;
  /** 
   * Adresse physique de l'utilisateur. 
   */ 
  address: string | null;
  /** 
   * Indique si l'utilisateur souhaite recevoir des notifications par email. 
   */ 
  notificationMail: boolean;
  /** 
   * Indique si l'utilisateur souhaite recevoir des notifications par SMS. 
   */ 
  notificationSms: boolean;
  /** 
   * Indique si le compte de l'utilisateur est activé. 
   */ 
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
      enabled: !!userInfo,
  });
};