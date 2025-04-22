import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const getEmployeeById = async (token: string|null, id: number) => {
    if (!token) {
        window.location.href = "/login";
        return null;
    }

    return await fetch(`${API_URL}/employee/`+id, {
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

export const useGetEmployee = (page: string, id: number ,token: string|null) => {
    return useQuery({
        queryKey: ["employee", id, token],
        queryFn: () => getEmployeeById(token, id),
        enabled: page === "salarieDetail",
    })
}