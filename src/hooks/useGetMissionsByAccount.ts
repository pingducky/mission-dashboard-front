import { useQuery } from "@tanstack/react-query";
import { MissionType } from "./useGetMissionTypes";

const API_URL = import.meta.env.VITE_API_URL;

type limitedAccountModel = {
    /**
     * Id
     */
    id: number;
    /**
     * Prénom
     */
    firstName: string;
    /**
     * Nom
     */
    lastName: string;
};

export type Mission = {
    /**
     * Id
     */
    id: number;
    /**
     * Description
     */
    description: string;
    /**
     * Date de début
     */
    timeBegin: string;
    /**
     * Date de fin
     */
    estimatedEnd?: string | null;
    /**
     * Date de fin
     */
    timeEnd?: string | null;
    /**
     * Adresse
     */
    address: string;
    /**
     * Ville
     */
    city?: string | null;
    /**
     * Code postale
     */
    postalCode?: string | null;
    /**
     * Code pays
     */
    countryCode?: string | null;
    /**
     * Id du type de mission
     */
    idMissionType: number;
    /**
     * Comptes lié à la mission
     */
    AccountModels: limitedAccountModel[];
    /**
     * Type de mission
     */
    missionType: MissionType;
};

type Params = {
    /**
     * Id du compte
     */
    accountId: string;
    /**
     * Date de début
     */
    from?: string;
    /**
     * Date de fin
     */
    to?: string;
    /**
     * Filtre type
     */
    filterByType?: number;
    /**
     * Limit
     */
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
