import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id , name ,adress, phone ,position,department} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ _id });
        if (user) {
            return NextResponse.json({ error: "Email already used" }, { status: 400 });
        }

        
        user.name  = name;
        user.phone = phone;
        user.adress = adress
        user.position = position;
        user.department =department;    
        

        

        
        

        

        return NextResponse.json({
            message: "Account created successfully",
            success: true,
            
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
