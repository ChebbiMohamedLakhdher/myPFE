import { connect } from "@/dbConfig/dbConfig";
import { ReunionForm} from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";



connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const {title , persons, date, time,  uploadDocument, place, ordredujour,  } = reqBody;
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


        const savedFormR = await newFormR.save();

        console.log(savedFormR);


        return NextResponse.json({
            message: "Offer created successfully",
            success: true, 
            savedFormR
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}