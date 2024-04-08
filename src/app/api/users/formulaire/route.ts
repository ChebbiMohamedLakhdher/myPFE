import { connect } from "@/dbConfig/dbConfig";
import Offer from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";



connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { type, requirements, posts_number, description, title, startdate, enddate, ispaid, department, position } = reqBody;

        console.log(reqBody);

                
        

        const newOffer = new Offer({
            type,
            requirements,
            posts_number,   
            description,
            title, 
            startdate, 
            enddate,
            ispaid,
            department, 
            position,
        });

        const savedOffer = await newOffer.save();
        console.log(savedOffer);

        

        return NextResponse.json({
            message: "Offer created successfully",
            success: true,
            savedOffer
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
