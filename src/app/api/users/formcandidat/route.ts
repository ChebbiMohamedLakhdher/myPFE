import { connect } from "@/dbConfig/dbConfig";
import {CandidatForm } from "@/models/candidatModel";
import { NextRequest, NextResponse } from "next/server";

import fs from 'fs';


connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const Name = formData.get('Name');
        const LastName = formData.get('LastName');
        const Adress = formData.get('Adress');
        const Email = formData.get('Email');
        const offerId = formData.get('offerId');
        const description = formData.get('description');
        

        // Obtenir le fichier
        const uploadDocumentFile : any= formData.get('uploadDocument');

        // Lire le contenu du fichier en tant que buffer
        const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());


        const uploadDocumentFile1 : any= formData.get('uploadDocument1');

        const uploadDocumentBuffer1 = Buffer.from(await uploadDocumentFile1.arrayBuffer());

        // Enregistrer le formulaire de réunion dans la base de données
        const newFormCand = new CandidatForm ({
            Name,
            LastName,
            Adress,
            offerId,   
            Email,
         
           
            description,
        
            uploadDocument: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
            uploadDocument1: {
                contentType: uploadDocumentFile.type,
                fileName: uploadDocumentFile.name,
                data: uploadDocumentBuffer
            },
          
        });
        const savedFormCand = await newFormCand.save();

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormCand
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}