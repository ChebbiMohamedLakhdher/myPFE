    import { CongeForm } from '@/models/congeModel';
    import { connect } from "@/dbConfig/dbConfig";
    
    import { NextRequest, NextResponse } from "next/server";
    import { NextApiRequest, NextApiResponse } from 'next';


    // Connect to the database
    connect();

    // Function to handle fetching all offers
    export async function POST(request: NextRequest) {
        try {
            // Find all offers in the database
            const conges = await CongeForm.find();
            

            // Return all offers
            return NextResponse.json(conges); // Use NextResponse to properly format the JSON response

        } catch (error: any) {
            // Handle any errors
            return NextResponse.json({ error: error.message }, { status: 500 }); // Use NextResponse to properly format the JSON response
        }
    }


