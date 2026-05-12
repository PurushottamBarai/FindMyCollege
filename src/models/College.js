/*This models folder holds the structure / schema for your database. 
These are the fields that will be present in your database.
They also tell the database what type of data to expect (e.g. String, Number).*/

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    "Sr. No.": {
        type: Number
    },
    "College Code": {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model('College', collegeSchema);