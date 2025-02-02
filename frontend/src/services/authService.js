const API_URL = "http://localhost:5000/api/auth";

// Helper function to send POST requests
const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
};

// Login User
export const loginUserAPI = async (email, password) => {
    return await postRequest(`${API_URL}/login`, { email, password });
};

// Logout User
export const logoutUserAPI = async () => {
    return await postRequest(`${API_URL}/logout`, {});
};
