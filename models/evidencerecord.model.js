const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const evidenceRecordSchema = new Schema({
    Author: {
        type: String,
        trim: true
    },
    Title: {
        type: String,
        trim: true,
        unique: true
    },
    Date: {
        type: Date
    },
    Description: {
        type: String,
        trim: true,
    },
    Rating: {
        type: Number,
    },
    Participants: {
        type: String,
        trim: true
    },
    Outcome: {
        type: String,
        trim: true,
        maxlength: 3
    },
    Context: {
        type: String,
        trim: true
    },
    Result: {
        type: String,
        trim: true
    },
    ResearchMethod: {
        type: String,
        trim: true
    },
    SoftwareEngineeringMethod: {
        type: String,
        trim: true
    },
    SoftwareEngineeringMethod: {
        type: String,
        trim: true
    }
});

const EvidenceRecord = mongoose.model('EvidenceRecord', evidenceRecordSchema);

module.exports = EvidenceRecord;