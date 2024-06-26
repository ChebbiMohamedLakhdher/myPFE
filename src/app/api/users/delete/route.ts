import { connect } from "@/dbConfig/dbConfig";
import Offer from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';


// Connect to the database
connect();



// Function to handle deleting an offer
export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // Extract offerId from request body
        const { offerId } = reqBody;

        // Delete the offer from the database
        const deletedOffer = await Offer.findByIdAndDelete(offerId);

        if (!deletedOffer) {
            // Offer not found
            return NextResponse.json({ error: "Offer not found" }, { status: 404 });
        }

        // Offer successfully deleted
        return NextResponse.json({ message: "Offer deleted successfully" });

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
