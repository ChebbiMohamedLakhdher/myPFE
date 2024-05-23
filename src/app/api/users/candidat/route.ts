import { connect } from "@/dbConfig/dbConfig";
import Offers from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // Find all users in the database
        const reqBody = await request.json();
        const {type} = reqBody;

        const offer = await Offers.find(type);

        // Return all users
        return NextResponse.json(offer); // Use NextResponse to properly format the JSON response

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
    }
}
