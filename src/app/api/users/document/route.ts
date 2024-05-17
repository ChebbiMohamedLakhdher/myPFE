import { connect } from "@/dbConfig/dbConfig";
import { DocumentsForm} from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title');
        const targeteddepartments = formData.get('targeteddepartments');
        

        // Obtenir le fichier
        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());

        // Enregistrer le formulaire de réunion dans la base de données
        const newFormD = new DocumentsForm({
            title,
            targeteddepartments,
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
            
        });
        const savedFormD = await newFormD.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormD
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}