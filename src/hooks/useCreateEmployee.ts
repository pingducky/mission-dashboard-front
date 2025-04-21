import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

type CreateEmployeePayload = {
    /**
     * Prénom
     */
    firstName: string;
    /**
     * Nom
     */
    lastName: string;
    /**
     * Email
     */
    email: string;
    /**
     * Numéro de téléphone
     */
    phoneNumber: string;
    /**
     * Adresse
     */
    address: string;
    /**
     * Ville
     */
    city: string;
    /**
     * Code postal
     */
    postalCode: string;
    /**
     * Code pays (ex: FR, BE, etc.)
     */
    countryCode: string;
    /**
     * Notification par mail activée
     */
    notificationMail: boolean;
    /**
     * Notification par SMS activée
     */
    notificationSms: boolean;
    /**
     * Autorisation de la géolocalisation GPS
     */
    isGpsTrackingAllowed: boolean;
    /**
     * Employé activé
     */
    isEnabled: boolean;
    /**
     * Liste des IDs de rôles assignés
     */
    roleIds: number[];
  };
  
const createEmployee = async (data: CreateEmployeePayload) => {
  const res = await fetch(`${API_URL}/employee`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création du salarié");
  }

  return res.json();
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: (data: CreateEmployeePayload) => createEmployee(data),
  });
};
