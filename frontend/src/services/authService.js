// ✅ API Base URL (Environment Variable)
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to send POST requests
const postRequest = async (endpoint, body) => {
    const response = await fetch(`${API_URL}${endpoint}`, { // ✅ Removed extra `/auth`
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

// ✅ Login User
export const loginUserAPI = async (email, password) => {
    return await postRequest("/auth/login", { email, password }); // ✅ Fixed endpoint
};

// ✅ Logout User
export const logoutUserAPI = async () => {
    return await postRequest("/auth/logout", {}); // ✅ Fixed endpoint
};
