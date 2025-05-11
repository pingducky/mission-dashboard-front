import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

type DashboardStats = {
  /**
   * Indique le nombre total d'employés actifs
   */
  employeeCount: number;
  /**
   * Indique le nombre de missions terminées (celle qui ont une date de fin, parmi tous les utilisateurs) si admin OU le nombre de missions terminées pour l'utilisateur
   */
  missionsDoneCount: number;
  /**
   * Indique le nombre de missions prévues pour aujourd’hui (parmi tous les utilisateurs) si admin OU Nombre de missions du jour pour l'utilisateur
   */
  missionsTodayCount: number;
  /**
   * Indique le temps de travail en heure prévu pour aujourd'hui
   */
  workingTimeToday: string;
  /**
   * Indique si l'utilisateur est administrateur.
   */
  isAdmin: boolean;
};

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      "Erreur lors de la récupération des statistiques du dashboard"
    );
  }

  return res.json();
};

export const useGetDashboardStats = () => {
  return useQuery<DashboardStats, Error>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    retry: 2, // Tentatives supplémentaires en cas d'échec
    staleTime: 20 * 1000, // 30 secondes avant de refetch
  });
};
