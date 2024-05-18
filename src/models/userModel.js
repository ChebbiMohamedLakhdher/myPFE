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
        phone: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        department: {
            type: String,
            required: false
        },
        position: {
            type: String,
            required: false
        },
        birthday: {
            type: Date,
            required: false
        },
        picture: {
            data: Buffer, // To store the image data
            contentType: String, // To store the MIME type of the image
            fileName: String, // To store the original file name
            required: false // This field is optional
        },
        resetToken: {
            type: String,
            required: false,
        },
        resetTokenExpiry: {
            type: Date,
            required: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date
    }
);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
