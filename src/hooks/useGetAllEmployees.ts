import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

export type EmployeeFilter = 'all' | 'active' | 'inactive' | 'online';

const API_URL = import.meta.env.VITE_API_URL;

const getAllEmployees = async (filter: EmployeeFilter): Promise<User[]> => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
        return [];
    }

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

export const useListEmployee = (filter: EmployeeFilter = "all") => {
    return useQuery({
        queryKey: ["employees", filter],
        queryFn: () => getAllEmployees(filter),
        refetchOnWindowFocus: false,
        retry: false,
    });
}