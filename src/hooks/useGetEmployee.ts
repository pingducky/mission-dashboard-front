import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const getEmployeeById = async (id: number) => {
    return await fetch(`${API_URL}/employee/`+id, {
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

export const useGetEmployee = (page: string, id: number) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => getEmployeeById(id),
        enabled: page === "salarieDetail",
    })
}