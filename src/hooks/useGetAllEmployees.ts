import { useQuery } from "@tanstack/react-query";
import { User } from "./useUserData";

export type EmployeeFilter = 'all' | 'active' | 'inactive' | 'online';

const API_URL = import.meta.env.VITE_API_URL;

const getAllEmployees = async (filter: EmployeeFilter): Promise<User[]> => {
    return await fetch(`${API_URL}/employee?status=`+filter, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then (data => {
        return data.json();
    }).catch(error => {
        throw error;
    });
}

export const useListEmployee = (filter: EmployeeFilter = "all") => {
    return useQuery({
        queryKey: [filter],
        queryFn: () => getAllEmployees(filter),
        refetchOnWindowFocus: false,
        retry: false,
    });
}