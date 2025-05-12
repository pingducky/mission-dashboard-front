import { useQuery } from "@tanstack/react-query";

export type MissionType = {
    /**
     * Id
     */
    id: number;
    /**
     * Libellé court
     */
    shortLibel: string;
    /**
     * Libellé long
     */
    longLibel: string;
    /**
     * Code couleur
     */
    color: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const getMissionTypes = async (): Promise<MissionType[]> => {
    return await fetch(`${API_URL}/mission/type`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des types de mission");
        }
        return response.json();
    }).catch(error => {
        throw error;
    });
}

export const useGetMissionTypes = (enabled = true) => {
    return useQuery({
        queryKey: ["missionTypes"],
        queryFn: getMissionTypes,
        enabled: enabled,
    });
}
