import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
export type MissionType = {
    id: number;
    shortLibel: string;
    longLibel: string;
};

const getEmployeeById = async (): Promise<MissionType[]> => {
    return await fetch(`${API_URL}/mission/type`, {
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

export const useGetmissionTypes = () => {
    return useQuery({
        queryKey: ["missionTypes"],
        queryFn: () => getEmployeeById(),
    })
}