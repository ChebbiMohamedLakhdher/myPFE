import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // Find all users in the database
        const offers = await User.find();

        // Return all users
        return NextResponse.json(offers); // Use NextResponse to properly format the JSON response

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
    }
}
