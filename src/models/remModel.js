import mongoose from "mongoose";

// Define schema for reunion form
const remSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    persons:{
        type: String,
        required: true
    },
    uploadDocument: {
        data: Buffer, // Or Schema.Types.Buffer
        contentType: String, // To store MIME type
        fileName: String,
    },
   
    
});



// Create models for each form type
const RemForm = mongoose.models.RemForm || mongoose.model("RemForm", remSchema);


export { RemForm };
