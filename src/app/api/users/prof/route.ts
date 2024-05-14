import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

// Connect to the database
connect();

// Function to handle deleting an offer
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = reqBody; // Accessing userId property
        // Alternatively, you can use bracket notation: const userId = reqBody['userId'];
        console.log(token)
        
        // User updated successfully
        return NextResponse.json({ message: "User updated successfully" });

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
