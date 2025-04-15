export const getAllEmployees = async (token: string) => {
    console.log('token',token);
    if (!token) {
        throw new Error('Token not found');
    }
    const API_URL = import.meta.env.VITE_API_URL;

    return await fetch(`${API_URL}/employee`, {
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