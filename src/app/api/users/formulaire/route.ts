import { connect } from "@/dbConfig/dbConfig";
import Offer from "@/models/offerModel";
import { NextRequest, NextResponse } from "next/server";



connect();



export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title');
        const requirements = formData.get('requirements');
        const startdate = formData.get('startdate');
        const enddate = formData.get('enddate');
        const posts_number = formData.get('posts_number');
        const ispaid = formData.get('ispaid');
        const type = formData.get('type');
        const position = formData.get('position');
        const description = formData.get('description');
        const department = formData.get('department');


                
        

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
