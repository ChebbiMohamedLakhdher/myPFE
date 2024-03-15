import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);

        // Instead of setting properties to undefined, you can delete them
        delete user.resetToken;
        delete user.resetTokenExpiry;
        await user.save();
        const response = NextResponse.json({
            message: "token true",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 

        })
        return response;

        // Return response separately with data and status
        return NextResponse.json({
            message: "Password verified successfully",
            success: true
        }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
