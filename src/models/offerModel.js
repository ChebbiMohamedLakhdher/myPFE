import mongoose from "mongoose";

// Define schemas for different offer types


const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the title"],
    },
    startdate: {
        type: Date,
        required: [true, "Please provide your startdate"]
    },
    type: {
        type: String,
        required: [true, "Please provide the type"],
    },
    requirements: {
        type: String,
        required: [true, "Please provide your requirements"]
    },
    posts_number: {
        type: Number,
        required: [true, "Please provide number of posts"]
    },
    description: {
        type: String,
    },
    position: {
        type: String,
        
    },
    department: {
        type: String,
    },
    enddate: {
        type: Date,
        
    },
    ispaid: {
        type: String,
    }
});

// Define method to get offer type


const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);

export default Offer;



