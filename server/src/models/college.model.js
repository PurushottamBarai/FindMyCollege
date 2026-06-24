import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    "SrNo": {
        type: Number
    },
    "College Code": {
        type: String,
        required: true
    },
    "College Name": {
        type: String,
        required: true
    },
    "Course Name": {
        type: String
    },
    "Course Type": {
        type: String
    },
    "Status": {
        type: String
    },
    "Total Intake": {
        type: Number
    },
    "District": {
        type: String
    }
}, { 
    strict: false,  
    collection: 'colleges' 
});

export default mongoose.model('College', collegeSchema);