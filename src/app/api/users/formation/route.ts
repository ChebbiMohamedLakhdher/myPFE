import { connect } from "@/dbConfig/dbConfig";
import { FormationForm} from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title');
        const targeteddepartments = formData.get('targeteddepartments');
        const startdate = formData.get('startdate');
        const enddate = formData.get('enddate');
        const time = formData.get('time');
        const location = formData.get('location');
        const type = formData.get('type');
        const formateur = formData.get('formateur');
        const description = formData.get('description');
        const namelocation = formData.get('namelocation');

        // Obtenir le fichier
        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());

        // Enregistrer le formulaire de réunion dans la base de données
        const newFormF = new FormationForm({
            title,
            targeteddepartments,
            startdate,
            time,
            enddate,
            location,
            type,
            formateur,
            description,
            namelocation,
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
          
        });
        const savedFormF = await newFormF.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormF
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}