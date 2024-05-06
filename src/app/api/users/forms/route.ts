import { connect } from "@/dbConfig/dbConfig";
import { ReunionForm, DocumentsForm, FormationForm } from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";
import Form from "@/models/offerModel";


connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {title , persons, date, time, type, uploadDocument, place, ordredujour, targeteddepartments  , startdate, enddate, location ,formateur, description} = reqBody;
        console.log(reqBody);

                
        

        const newFormR = new ReunionForm({
            title,
            persons,
            date,
            time,
            uploadDocument,
            place,
            ordredujour,
        });
        const newFormF = new FormationForm({
            title,
            uploadDocument,
            targeteddepartments,
        });
        const newFormD = new DocumentsForm({
            title,
            targeteddepartments,
            startdate,
            time,
            enddate,
            type,
            location,
            formateur,
            uploadDocument,
            description,
        });

        const savedFormD = await newFormD.save();
        const savedFormF = await newFormF.save();
        const savedFormR = await newFormR.save();
        console.log(savedFormD);
        console.log(savedFormR);
        console.log(savedFormF);

        

        return NextResponse.json({
            message: "Offer created successfully",
            success: true,
            savedFormD,
            savedFormF,
            savedFormR,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
