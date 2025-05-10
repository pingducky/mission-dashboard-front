import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

const API_URL = import.meta.env.VITE_API_URL;

export type MissionType = {
  id: number;
  shortLibel: string;
  longLibel: string;
};

export type Picture = {
    id: number;
    name: string;
    alt?: string;
    path: string;
    idMessage?: number | null;
    idMission?: number | null;
  };

export type MissionModel = {
  id: number;
  description: string;
  timeBegin: string;
  estimatedEnd?: string;
  timeEnd?: string;
  address: string;
  idMissionType: number;
  pictures: Picture[];
  missionType: MissionType;
  assignedUsers: User[];
};

export type CategorizedMissions = {
  past: MissionModel[];
  current: MissionModel[];
  future: MissionModel[];
};

type filterTime = "past" | "current" | "future"

const getMissionsByAccount = async (
  accountId: number,
  filters: filterTime[] = ["past", "current", "future"],
  limit?: number
): Promise<CategorizedMissions> => {
  const queryParams = new URLSearchParams();
  queryParams.append("filters", filters.join(","));
  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  const res = await fetch(
    `${API_URL}/mission/missionCategorized/${accountId}?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des missions");
  }

  return res.json();
};

type UseGetMissionsByAccountOptions = {
    /**
     * Id du compte
     */
    accountId: number;
    /**
     * Filtres 
     */
    filters?: filterTime[];
    /**
     * Limite
     */
    limit?: number;
    /**
     * Est active 
     */
    enabled?: boolean;
  };
  
export const useGetMissionsByAccount = ({
  accountId,
  filters = ["past", "current", "future"],
  limit,
  enabled = true,
}: UseGetMissionsByAccountOptions) => {
  return useQuery({
    queryKey: ["missions", accountId, filters, limit],
    queryFn: () => getMissionsByAccount(accountId, filters, limit),
    enabled: enabled && !!accountId,
  });
};
