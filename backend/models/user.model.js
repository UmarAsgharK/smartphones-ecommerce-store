import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        // ! Have to see how to make the picture work
        profilePicture: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "buyer", "seller"],
            default: "buyer",
        },
        whatsappNumber: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
    // ! What does this do I have to study
    if (!this.isModified("password")) {
        return next(); // Skip if password is not modified
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;
