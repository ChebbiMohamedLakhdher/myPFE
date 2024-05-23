import { RemForm } from '@/models/remModel';
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id } = reqBody;
        const user = await User.findOne(_id); // Use findById instead of findOne

        if (!user) {
            throw new Error("User not found");
        }

        const persons = user.name; 
        const remforms = await RemForm.find({ persons }); // Find RemForms by person's name (use find to get an array)
        console.log(remforms);

        return NextResponse.json(remforms); // Return an array of remforms
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
