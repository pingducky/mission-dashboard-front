import { useQuery } from '@tanstack/react-query';

const getUserFiles = async (token: string, id: number) => {
    if (!token) {
        window.location.href = "/login";
        return null;
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
  
export const useGetUserFiles = (token: string, id: number) => {
    return useQuery({
        queryKey: ['account', token],
        queryFn: () => getUserFiles(token, id),
        enabled: !!token,
    });
};
