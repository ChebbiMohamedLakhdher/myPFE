import { connect } from "@/dbConfig/dbConfig";
import { RemForm} from "@/models/remModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title');
        const persons = formData.get('persons');
        

        // Obtenir le fichier
        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());

        // Enregistrer le formulaire de réunion dans la base de données
        const newFormRe = new RemForm({
            title,
            persons,
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
            
        });
        const savedFormRe = await newFormRe.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormRe
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}