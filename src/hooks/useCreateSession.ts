import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type CreateSessionPayload = {
  /**
   * Id du compte connecté
   */
  idAccount: number;
  /**
   * Id de la mission associée (optionnel)
   */
  idMission?: number;
  /**
   * Heure de début de la session
   */
  startTime: string;
  /**
   * Heure de fin de la session (optionnel)
   */
  endTime?: string;
  /**
   * Statut de la session
   */
  status: string;
  /**
   * Liste des pauses durant la session (optionnel)
   */
  pauses?: {
    /**
     * Début de la pause
     */
    pauseTime: string;
    /**
     * Fin de la pause
     */
    resumeTime: string;
  }[];
};

export type CreateSessionResponse = {
  /**
   * Id de la session créée
   */
  id: number;
  /**
   * Id du compte associé à la session
   */
  idAccount: number;
  /**
   * Id de la mission associé à la session
   */
  idMission?: number;
  /**
   * Heure de début de la mission associé à la session
   */
  startTime: string;
  /**
   * Heure de fin de la mission associé à la session
   */
  endTime?: string;
  /**
   * Status de la mission associé à la session
   */
  status: string;
};

const createSession = async (data: CreateSessionPayload) => {
  const res = await fetch(`${API_URL}/workSession/manualSession`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData?.error || "Erreur lors de la création de la session"
    );
  }

  return res.json();
};

export const useCreateSession = () => {
  return useMutation({
    mutationFn: (data: CreateSessionPayload) => createSession(data),
  });
};
