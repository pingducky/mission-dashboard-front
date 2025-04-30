import { useQuery } from '@tanstack/react-query';

const getUserAccount = async () => {
    const token = sessionStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/account/token/${token}`, {
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
  
export const useGetUserAccount = (token: string) => {
    return useQuery({
        queryKey: ['account', token],
        queryFn: () => getUserAccount(),
        enabled: !!token,
    });
};
