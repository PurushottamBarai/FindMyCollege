const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    srNo: {
        type: Number,
        required: true
    },
    collegeCode: {
        type: String,
        required: true,
        unique: true
    },
    courseType: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

collegeSchema.index({ district: 1 });
collegeSchema.index({ courseName: 1 });
collegeSchema.index({ courseType: 1 });
collegeSchema.index({ collegeName: 'text' });

module.exports = mongoose.model('College', collegeSchema);