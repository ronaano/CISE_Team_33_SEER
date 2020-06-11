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
    Month: {
        type: String,
        trim: true,
        maxlength: 3
    },
    Year: {
        type: Number,
        maxlength: 4
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
        reqiured: true
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
    SoftwareEngineeringMethodology: {
        type: String,
        trim: true
    }
});

const EvidenceRecord = mongoose.model('EvidenceRecord', evidenceRecordSchema);

module.exports = EvidenceRecord;