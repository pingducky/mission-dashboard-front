import { useQuery } from "@tanstack/react-query";
import { MissionModel } from "./useGetMissionsByAccount";

const API_URL = import.meta.env.VITE_API_URL;

const getAllMissions = async (filter: number, id: number): Promise<MissionModel[]> => {
    const filterByType = filter && filter !== 0 ? `?filterByType=${filter}` : '';
    return await fetch(`${API_URL}/mission/listMissions/${id}${filterByType}`, {
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

export const useGetMissions = (filter: number, id: number) => {
    return useQuery({
        queryKey: ["employees", filter],
        queryFn: () => getAllMissions(filter, id),
        refetchOnWindowFocus: false,
        retry: false,
    });
}