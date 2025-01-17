import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};

