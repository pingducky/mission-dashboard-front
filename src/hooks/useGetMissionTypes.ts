import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
export type MissionType = {
    /**
     * Identifiant de la mission
     */
    id: number;
    /**
     * Libellé court de la mission
     */
    shortLibel: string;
    /**
     * Libellé long de la mission
     */
    longLibel: string;
};

const getMissionTypes = async (): Promise<MissionType[]> => {
    return await fetch(`${API_URL}/mission/type`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then (data => {
        return data.json();
    }).catch(error => {
        throw error;
    });
}

export const useGetmissionTypes = () => {
    return useQuery({
        queryKey: ["missionTypes"],
        queryFn: () => getMissionTypes(),
    })
}