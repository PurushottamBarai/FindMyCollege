const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    'Sr. No.': {
        type: Number,
        required: true
    },
    'College Code': {
        type: String,
        required: false,
        default: null
    },
    'Course Type': {
        type: String,
        required: true
    },
    'Course Name': {
        type: String,
        required: true
    },
    'District': {
        type: String,
        required: true
    },
    'College Name': {
        type: String,
        required: true
    },
    'University': {
        type: String,
        required: false,
        default: null
    },
    'Course Status': {
        type: String,
        required: false,
        default: null
    },
    'Course Autonomy Status': {
        type: String,
        required: false,
        default: null
    },
    contactNumber: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Create indexes for better search performance
collegeSchema.index({ 'District': 1 });
collegeSchema.index({ 'Course Name': 1 });
collegeSchema.index({ 'Course Type': 1 });
collegeSchema.index({ 'College Name': 'text' });

module.exports = mongoose.model('College', collegeSchema);