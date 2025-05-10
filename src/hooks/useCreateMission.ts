import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type CreateMissionPayload = {
  /** 
   * Description
   */
  description: string;
  /** 
   * Date de début
   */
  timeBegin: string;
  /**
   * Date de fin estimé
   */
  estimatedEnd: string;
  /**
   * Date de fin
   */
  timeEnd?: string;
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
   * Code pays
   */
  countryCode: string;
  /**
   * Id du type de mission
   */
  missionTypeId: number;
  /**
   * Comptes utilisateurs liés à la mission
   */
  accountAssignIds: number[];
  /**
   * Images liés à la mission
   */
  pictures?: File[];
};

export type CreateMissionResponse = {
    /**
     * Id de la mission
     */
    missionId: number;
    /**
     * Assignation des missions aux comptes réussis
     */
    assignedAccountIds: number[];
    /**
     * Assignation des missions aux comptes en échec
     */
    failedAssignments: {
      /**
       * Id compte utilisateur
       */
      accountId: number;
      /**
       * Raison de l'échec d'assignation 
       */
      reason: string;
    }[];
    /**
     * Fichiers uploadés avec succès
     */
    uploadedFiles: string[];
    /**
     * Fichiers qui n'ont pas pu être upload
     */
    rejectedFiles: {
      /**
       * Id
       */
      id: string;
  
      /**
       * Raison
       */
      reason: string;
    }[];
  };
  
const createMission = async (data: CreateMissionPayload) => {
  const formData = new FormData();

  formData.append("description", data.description);
  formData.append("timeBegin", data.timeBegin);
  if (data.timeEnd) formData.append("timeEnd", data.timeEnd);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("postalCode", data.postalCode);
  formData.append("countryCode", data.countryCode);
  formData.append("missionTypeId", String(data.missionTypeId));
  formData.append("accountAssignIds", JSON.stringify([1,2]));

  if (data.estimatedEnd) formData.append("estimatedEnd", data.estimatedEnd);

  if (data.pictures && data.pictures.length > 0) {
    data.pictures.forEach((file) => {
      formData.append("pictures", file);
    });
  }

  const res = await fetch(`${API_URL}/mission`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || "Erreur lors de la création de la mission");
  }

  return res.json();
};

export const useCreateMission = () => {
  return useMutation({
    mutationFn: (data: CreateMissionPayload) => createMission(data),
  });
};
