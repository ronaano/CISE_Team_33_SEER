const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moderatedArticleSchema = new Schema({
    _id: {
        type: Object,
        required: true,
        unique: true
    },
    author: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    journal: {
        type: String,
        trim: true,
    },
    year: {
        type: Number,
        maxlength: 4
    },
    volume: {
        type: Number,
    },
    number: {
        type: Number,
    },
    pages: {
        type: String,
        trim: true
    },
    month: {
        type: String,
        trim: true,
        maxlength: 3
    },
    status: {
        type: String,
        required: true,
        trim: true
    }
}, {
    autoIndex: false,
    timestamps: true
});


const ModeratedArticle = mongoose.model('ModeratedArticle', moderatedArticleSchema);

module.exports = ModeratedArticle;