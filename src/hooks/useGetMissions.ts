import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

export type MissionFilter = 'all' | 'active' | 'canceled' | 'finished' | 'scheduled';
export type Mission = {

}

const API_URL = import.meta.env.VITE_API_URL;

const getAllMissions = async (token: string|null, filter: MissionFilter, id: number, isAdmin: boolean): Promise<User[]> => {
    if (!token) {
        window.location.href = "/login";
        return [];
    }

    return await fetch(`${API_URL}/listMissions/:id?filter=`+filter, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then (data => {
        return data.json();
    }).catch(error => {
        throw error;
    });
}

export const useListMissions = (page: string, filter: MissionFilter = "all", token: string|null, id: number, isAdmin: boolean) => {
    return useQuery({
        queryKey: ["employees", token, filter],
        queryFn: () => getAllMissions(token, filter, id, isAdmin),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: page === "salarie"
    });
}