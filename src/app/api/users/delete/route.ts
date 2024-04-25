import { connect } from "@/dbConfig/dbConfig";
import Offer from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';


// Connect to the database
connect();



// Function to handle deleting an offer
export async function DELETE  (request: NextApiRequest) {
    try {
        console.log(request)
        // Extract offerId from request parameters
        const { offerId } = request.query;

        // Delete the offer from the database
        const deletedOffer = await Offer.findByIdAndDelete(offerId as string);
        console.log("offerId dqqsdqs")

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
