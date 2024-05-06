import { connect } from "@/dbConfig/dbConfig";
import { DocumentsForm } from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";



connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const {title , targeteddepartments , uploadDocument, } = reqBody;
        console.log(reqBody); 




        const newFormD = new DocumentsForm({
            title,
            targeteddepartments,     
            uploadDocument,
            
        });


        const savedFormD = await newFormD.save();

        console.log(savedFormD);


        return NextResponse.json({
            message: "Offer created successfully",
            success: true, 
            savedFormD
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}