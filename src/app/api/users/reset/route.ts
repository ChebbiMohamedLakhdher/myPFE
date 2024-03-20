import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPass } = reqBody; // Added newPassword
        console.log(token);

        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);
        console.log(newPass);
        

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPass.password, salt);
        // Update user's password
        user.password = hashedPassword  ; // Assuming the password field is named 'password'
        // Instead of setting properties to undefined, you can delete them
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        
        // Set new token in cookies if needed
        const response = NextResponse.json({
            message: "Password updated successfully",
            success: true
        });

         response.cookies.set("token", token, {
             httpOnly: true
         });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}



