import { useQuery } from '@tanstack/react-query';

export type File = {
    id: number;
    name: string;
    path: string;
    size: string;
    idAccount: number;
}

const getUserFiles = async (id: number, token: string|null): Promise<File[]> => {
    if (!token) {
        window.location.href = "/login";
        return [];
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/file/account/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du compte');
    }
    
    return response.json();
};
  
export const useGetUserFiles = (id: number, page: string, token: string|null) => {
    return useQuery({
        queryKey: ['account', token, id],
        queryFn: () => getUserFiles(id, token),
        enabled: page === "salarieDetail",
    });
};
