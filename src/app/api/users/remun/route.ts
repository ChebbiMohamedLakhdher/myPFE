import { RemForm } from '@/models/remModel';
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // Find all users in the database
        const reqBody = await request.json();
        const { _id } = reqBody;
        const user = await User.findOne(_id); // Use findById instead of find

        if (!user) {
            throw new Error("User not found"); // Throw an error if user is not found
        }

        const persons = user.name; 
        const remform = await RemForm.findOne({ persons }); // Find RemForms by person's name
        console.log(remform)

        // Return the found RemForms
        return NextResponse.json(remform); // Use NextResponse to properly format the JSON response

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
    }
}
