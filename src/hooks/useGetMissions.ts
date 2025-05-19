import { useQuery } from "@tanstack/react-query";
import { Mission } from "./useGetMissionsByAccount";

const API_URL = import.meta.env.VITE_API_URL;

export type MissionFilter = 'actives' | 'past' | 'upcoming' | 'canceled' | 'all';

const getAllMissions = async (filter: string, id: number): Promise<Mission[]> => {
    return await fetch(`${API_URL}/mission/listMissions/${id}?status=${filter}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then (data => {
        return data.json();
    })
    .catch(error => {
        throw error;
    });
}

export const useGetMissions = (filter: string, id: number) => {
    return useQuery({
        queryKey: ["employees", filter],
        queryFn: () => getAllMissions(filter, id),
        refetchOnWindowFocus: false,
        retry: false,
    });
}