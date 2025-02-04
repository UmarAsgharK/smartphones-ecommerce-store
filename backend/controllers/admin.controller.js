import User from "../models/user.model.js"


// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};


// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.deleteOne();
        // console.log("User deleted");

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({ error: "Server errors" });
    }
};

