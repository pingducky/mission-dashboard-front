import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

type DashboardStats = {
  employeeCount: number;
  missionsDoneCount: number;
  missionsTodayCount: number;
  workingTimeToday: string;
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
    staleTime: 5 * 60 * 1000, // 5 minutes avant de refetch
  });
};
