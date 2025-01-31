import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

/**
 * A protected route that redirects to the login page if the user is not
 * logged in or does not have the required role.
 *
 * @param {string} role - The required role for the route.
 * @returns {React.ReactElement} - A React element to be rendered if the user
 * is authenticated and has the required role. Otherwise, a redirect to the
 * login page.
 */
const ProtectedRoute = ({ role }) => {
    // const { user } = useAuth();
    const user = true;

    if (!user || user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
