import { connect } from "@/dbConfig/dbConfig";
import { FormationForm } from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";



connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const {title , targeteddepartments , startdate, time, enddate ,type , namelocation ,location ,  formateur, uploadDocument ,  description,  } = reqBody;
        console.log(reqBody); 




        const newFormF = new FormationForm({
            title,
            targeteddepartments,
            startdate,
            time,
            enddate,
            type,
            namelocation,
            location,
            formateur,
            uploadDocument,
            description,
        });


        const savedFormF = await newFormF.save();

        console.log(savedFormF);


        return NextResponse.json({
            message: "Offer created successfully",
            success: true, 
            savedFormF
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}