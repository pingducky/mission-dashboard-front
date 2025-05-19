import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type latestWorkSession = {
    /**
     * Id de la session de travail
     */
    id: number;
    /**
     * Id de l'employé
     */
    idAccount: number;
    /**
     * Heure de début
     */
    startTime: string;
    /**
     * Heure de fin
     */
    endTime: string;
    /**
     * Statut de la session de travail
     */
    status: string;
    /**
     * Coordonées du début de la session de travail
     */
    startLocation: string;
    /**
     * Coordonées de fin de la session de travail
     */
    endLocation: string;
    /**
     * Description de la mission associée
     */
    description: string;
}

const getLatestWorkSession = async (id: number) : Promise<latestWorkSession|null> => {
    return await fetch(`${API_URL}/workSession/latest/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then (data => {
        return data?.json();
    }).catch(error => {
        throw error;
    });
}

export const useGetLatestWorkSession = (id: number) => {
    return useQuery({
        queryKey: ["workSession", id],
        queryFn: () => getLatestWorkSession(id),
    })
}