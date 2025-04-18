import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

const API_URL = import.meta.env.VITE_API_URL;

const getAllEmployees = async (token: string, filter: 'all' | 'active' | 'inactive' | 'online'): Promise<User[]> => {
    if (!token) return [];

    return await fetch(`${API_URL}/employee?status=`+filter, {
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

export const useListEmployee = (page: string, filter: 'all' | 'active' | 'inactive' | 'online' = "all", token: string) => {

    return useQuery({
        queryKey: ["employees", token, filter],
        queryFn: () => getAllEmployees(token, filter),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: page === "salarie"
    });
}