import { useQuery } from "@tanstack/react-query";
import { MissionModel } from "./useGetMissionsByAccount";

const API_URL = import.meta.env.VITE_API_URL;

const getMissionById = async (id: number) : Promise<MissionModel> => {
    return await fetch(`${API_URL}/mission/`+id, {
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

export const useGetMissionById = (id: number) => {
    return useQuery({
        queryKey: ["mission", id],
        queryFn: () => getMissionById(id),
    })
}