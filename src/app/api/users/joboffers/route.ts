import { connect } from "@/dbConfig/dbConfig";
import Offer from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

// Connect to the database
connect();

// Function to handle fetching all offers
export async function POST(request: NextApiRequest) {
    try {
        // Find all offers in the database
        const type = "employment";
        const offers = await Offer.find({ type });

        // Return all offers
        return NextResponse.json(offers); // Use NextResponse to properly format the JSON response

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
    }
}
