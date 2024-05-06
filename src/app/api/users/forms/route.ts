import { connect } from "@/dbConfig/dbConfig";
import { ReunionForm} from "@/models/formModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title');
        const persons = formData.get('persons');
        const date = formData.get('date');
        const time = formData.get('time');
        const place = formData.get('place');
        const ordredujour = formData.get('ordredujour');

        // Obtenir le fichier
        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());

        // Enregistrer le formulaire de réunion dans la base de données
        const newFormR = new ReunionForm({
            title,
            persons,
            date,
            time,
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
            place,
            ordredujour,
        });
        const savedFormR = await newFormR.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormR
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}