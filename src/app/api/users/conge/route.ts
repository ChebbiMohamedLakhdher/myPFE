import { connect } from "@/dbConfig/dbConfig";
import { CongeForm, MedicalForm } from "@/models/congeModel";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

connect();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        console.log(formData);

        const title = formData.get('title');
        const type = formData.get('type');
        const startdate = formData.get('startdate');
        const enddate = formData.get('enddate');
        const description = formData.get('description');
        const employeeid = formData.get('employeeid');

        let savedFormC;

        if (type === 'medical') {
            // Handle the "medical" type
            const uploadDocumentFile: any = formData.get('uploadDocument');
            const uploadDocumentBuffer = Buffer.from(await uploadDocumentFile.arrayBuffer());

            const newMedicalForm = new MedicalForm({
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
                employeeid
            });

            savedFormC = await newMedicalForm.save();
        } else if (type === 'normal') {
            // Handle the "normal" type
            const newCongeForm = new CongeForm({
                title,
                type,
                startdate,
                enddate,
                description,
                employeeid
            });

            savedFormC = await newCongeForm.save();
        } else {
            return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Form submitted successfully",
            success: true,
            savedFormC
        });
    } catch (error: any) {
        console.error('Error handling form submission:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
