import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Email Doesn't Exist" }, { status: 400 });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        const passwordResetExpires = Date.now() + 3600000;

        // Update user document with new resetToken and resetTokenExpiry
        user.resetToken = passwordResetToken;
        user.resetTokenExpiry = new Date(passwordResetExpires);

        // Save the updated user object
        await user.save();

        const resetUrl = `http://localhost:3000/reset/${resetToken}`; // Added 'http://' to the URL
        console.log(resetUrl);

        await sendEmail({ email, emailType: "RESET", userId: user.id, resetUrl }); // Change 'VERIFY' to 'RESET'

        return NextResponse.json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error sending password reset email:", error);
        return NextResponse.json({ error: "Error sending password reset email" }, { status: 500 });
    }
}
