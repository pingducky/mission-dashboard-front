import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
    id: number;
    mail: string;
    token: string,
};

export const getUserDataFromToken = (): TokenPayload | null => {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return {
            id: decoded.id,
            mail: decoded.mail,
            token: token,
        };
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
};
