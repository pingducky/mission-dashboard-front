export const userAuthentication = async (email: string, password: string) => {
    console.debug("email : ", email);
    console.debug("password", password)
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