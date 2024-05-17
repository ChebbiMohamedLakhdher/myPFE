import mongoose from "mongoose";

// Define schema for reunion form
const reunionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    persons:{
        type: [String],
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    uploadDocument: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },
    place: {
        type: String,
        required: true
    },
    ordredujour: {
        type: String,
    },
    
});

// Define schema for documents form
const documentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    targeteddepartments:{
        type: String,
        required: true
    },
    uploadDocument: {
        fileName: String,
        data: Buffer
    },
    
});

// Define schema for formation form
const formationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    targeteddepartments:{
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    enddate: {
        type: Date,
    },
    type: {
        type: String,
        required: true
    },
    namelocation: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    formateur: {
        type: String,
        
    },
    uploadDocument: {
        fileName: String,
        data: Buffer
    },
    description: {
        type: String,
        required: true
    },
});

// Create models for each form type
const ReunionForm = mongoose.models.ReunionForm || mongoose.model("ReunionForm", reunionSchema);
const DocumentsForm = mongoose.models.DocumentsForm || mongoose.model("DocumentsForm", documentsSchema);
const FormationForm = mongoose.models.FormationForm || mongoose.model("FormationForm", formationSchema);

export { ReunionForm, DocumentsForm, FormationForm };
