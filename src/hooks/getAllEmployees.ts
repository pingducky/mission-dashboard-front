import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

const getAllEmployees = async (token: string): Promise<User[]> => {
    const API_URL = import.meta.env.VITE_API_URL;

    return await fetch(`${API_URL}/employee`, {
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

export const useListEmployee = (page: string) => {
    const token = sessionStorage.getItem("token") ?? "";

    return useQuery({
        queryKey: ["employees"],
        queryFn: () => getAllEmployees(token),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: page === "salarie"
    });
}