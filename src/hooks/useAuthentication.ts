import { useMutation } from "@tanstack/react-query";

export type authResp = {
    /**
     * Token
     */
    token: string;
}

const userAuthentication = async (email: string, password: string): Promise<authResp> => {
    const API_URL = import.meta.env.VITE_API_URL;

    return await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then (data => {
        return data.json();
    }).catch(error => {
        throw error;
    });
}

export const useAuthentication = (
        email: string,
        password: string,
        options?: { onSuccess?: (data: authResp) => void; OnError?: (error: unknown) => void}
    ) => {
    return useMutation({
        mutationFn: () => userAuthentication(email, password),
        retry: false,
        onSuccess: options?.onSuccess,
        onError: options?.OnError,
    });
}