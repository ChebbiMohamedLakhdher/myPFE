import mongoose from "mongoose";



// Define schema for formation form
const formCandSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
   
    uploadDocument: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },

    uploadDocument1: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },
    description: {
        type: String,
        required: true
    },
});

// Create models for each form type
const CandidatForm = mongoose.models.CandidatFormForm || mongoose.model("CandidatForm", formCandSchema);

export {  CandidatForm };
