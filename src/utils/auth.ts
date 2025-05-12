import { jwtDecode } from 'jwt-decode';

export type TokenPayload = {
    /**
     * Id de l'utilisateur
     */
    id: string;
    /**
     * Email
     */
    email: string;
    /**
     * Token
     */
    token: string,
    /**
     * Est admin
     */
    isAdmin: boolean,
};

export const getUserDataFromToken = (): TokenPayload | null => {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return {
            id: decoded.id,
            email: decoded.email,
            token: token,
            isAdmin: decoded.isAdmin
        };
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
};
