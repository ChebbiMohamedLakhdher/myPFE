import mongoose from "mongoose";

// Define schema for reunion form
const congeSchema = new mongoose.Schema({
    employeeid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddatedate: {
        type: Date,
        required: true
    }, 
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    uploadDocument: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },
    
});

// Define schema for documents form
const medicalSchema = new mongoose.Schema({
    employeeid: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    uploadDocument: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },
    description: {
        type: String,
    },
});



// Create models for each form type
const CongeForm = mongoose.models.CongeForm || mongoose.model("CongeForm", congeSchema);
const MedicalForm = mongoose.models.MedicalForm || mongoose.model("MedicalForm", medicalsSchema);


export { CongeForm, MedicalForm, };
