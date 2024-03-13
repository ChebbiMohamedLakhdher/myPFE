import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"]
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide your password"]
        },
        isEmployee: {
            type: Boolean,
            default: false,
           
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        resetToken:{
            type: String,
            required: false,
        },
        resetTokenExpiry:{
            type: Date,
            required : false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
