import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const authenticate = async (req, res, next) => {
    // const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    // ? I will be handling the token from the cookies as we are not getting the token
    // ? Directly from the in the header. Otherwise comment out res.json{token} from
    // ? authController login function. and above as well.

    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No access token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decoded.userId).select("-password")

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            req.user = user
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            } else {
                throw err;
            }
        }
    } catch (err) {
        console.log("Error in authenticate middleware", err);

        return res.status(401).json({ error: "Invalid token" });

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
