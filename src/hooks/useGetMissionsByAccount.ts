import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

// Renommer
export type AccountModel = {
    id: number;
    firstName: string;
    lastName: string;
};

export type MissionType = {
    id: number;
    shortLibel: string;
    longLibel: string;
    color: string;
};

export type Mission = {
    id: number;
    description: string;
    timeBegin: string;
    estimatedEnd?: string | null;
    timeEnd?: string | null;
    address: string;
    city?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    idMissionType: number;
    AccountModels: AccountModel[];
    missionType: MissionType;
};


type Params = {
    accountId: string;
    from?: string;
    to?: string;
    filterByType?: number;
    limit?: number;
};

const getMissionsByAccount = async ({ accountId, from, to, filterByType, limit }: Params): Promise<Mission[]> => {
    const params = new URLSearchParams();

    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (filterByType !== undefined) params.append("filterByType", filterByType.toString());
    if (limit !== undefined) params.append("limit", limit.toString());

    const url = `${API_URL}/mission/listMissions/${accountId}?${params.toString()}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des missions");
    }

    const data = await response.json();
    return data.missions;
};

export const useGetMissionsByAccount = (params: Params, enabled = true) => {
    return useQuery({
        queryKey: ["missions", params],
        queryFn: () => getMissionsByAccount(params),
        enabled,
    });
};
