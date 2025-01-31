import React, { useState } from "react";
import "./Users.css";

const AdminUsersPage = () => {
    const [userType, setUserType] = useState("all"); // Default: all users
    const [users, setUsers] = useState([
        // Dummy data for users
        { _id: "1", name: "John Doe", email: "john@example.com", role: "buyer" },
        { _id: "2", name: "Sarah Smith", email: "sarah@example.com", role: "seller" },
        { _id: "3", name: "Alex Johnson", email: "alex@example.com", role: "buyer" },
        { _id: "4", name: "Maria Garcia", email: "maria@example.com", role: "seller" },
    ]);

    // Filtering users based on the selected userType
    const filteredUsers = users.filter(
        (user) => userType === "all" || user.role === userType
    );

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id)); // Remove the user from the list
    };

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
                {filteredUsers.map((user) => (
                    <div key={user._id} className="user-card">
                        <div className="user-info">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(user._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsersPage;
