import { connect } from "@/dbConfig/dbConfig";
import { CongeForm} from "@/models/congeModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const employeeid = formData.get('employeeid');
        const title = formData.get('title');
        const type = formData.get('type');
        const startdate = formData.get('startdate');
        const enddate = formData.get('enddate');
        const description = formData.get('description');

        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());
       

        
        const newFormC = new CongeForm({
            employeeid,
            title,
            type,
            startdate,
            enddate,
            description,
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
            
        });
        const savedFormC = await newFormC.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormC
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}