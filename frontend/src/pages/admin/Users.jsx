import React, { useState, useEffect } from "react";
import "./Users.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUsersPage = () => {
    const [userType, setUserType] = useState("all"); // Default: all users
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state for fetch
    const [error, setError] = useState(null);        // Error state

    // Fetch users from the backend when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/admin/users`, {
                    method: "GET",
                    credentials: "include", // Ensures cookies (JWT) are sent with the request
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filtering users based on the selected userType
    const filteredUsers = users.filter(
        (user) => userType === "all" || user.role === userType
    );

    // Delete a user by making a DELETE request to the backend
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "DELETE",
                credentials: "include", // Send cookies along with the request
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            const data = await response.json();
            console.log(data);


            // Optionally, you might get a success message back; here we update the UI:
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            console.error(err);
            // Optionally, update error state or show a notification to the admin
        }
    };

    if (loading) {
        return <div className="admin-users-container">Loading users...</div>;
    }

    if (error) {
        return <div className="admin-users-container">Error: {error}</div>;
    }

    return (
        <div className="admin-users-container">
            <h1>Admin - Users</h1>

            {/* Filter buttons */}
            <div className="user-filters">
                <button
                    onClick={() => setUserType("all")}
                    className={userType === "all" ? "active" : ""}
                >
                    All Users
                </button>
                <button
                    onClick={() => setUserType("buyer")}
                    className={userType === "buyer" ? "active" : ""}
                >
                    Buyers
                </button>
                <button
                    onClick={() => setUserType("seller")}
                    className={userType === "seller" ? "active" : ""}
                >
                    Sellers
                </button>
            </div>

            {/* User list */}
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <p>
                                    <strong>Name:</strong> {user.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Role:</strong> {user.role}
                                </p>
                            </div>
                            <button className="delete-button" onClick={() => handleDelete(user._id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;
