import { useQuery } from '@tanstack/react-query';

export type File = {
    /**
     * Identifiant du fichier
     */
    id: number;
    /**
     * Nom du fichier
     */
    name: string;
    /**
     * Chemin vers le fichier
     */
    path: string;
    /**
     * Taille du fichier
     */
    size: string;
    /**
     * Identifiant du propriétaire du fichier
     */
    idAccount: number;
}

const getUserFiles = async (id: number): Promise<File[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/file/account/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du compte');
    }
    
    return response.json();
};
  
export const useGetUserFiles = (id: number, page: string) => {
    return useQuery({
        queryKey: ['account', id],
        queryFn: () => getUserFiles(id),
        enabled: page === "salarieDetail",
    });
};
