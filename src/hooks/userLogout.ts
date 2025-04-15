export const userLogout = async (token: string) => {
    if (token === "") { return; }

    const API_URL = import.meta.env.VITE_API_URL;

    return await fetch(`${API_URL}/auth/disconnect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then (data => {
        return data.json();
    }
    ).catch(error => {
        throw error;
    });

}