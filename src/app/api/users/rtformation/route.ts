import { FormationForm } from '@/models/formModel';
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // Find all users in the database
        const Formation = await FormationForm.find();

        // Return all users
        return NextResponse.json(Formation); // Use NextResponse to properly format the JSON response

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
    }
}






